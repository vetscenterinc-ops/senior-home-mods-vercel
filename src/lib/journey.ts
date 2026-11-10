"use client";

/**
 * Client journey: Prequalification -> Choose your next step -> Complete session
 * -> Submit documents -> Staff review -> Application preparation -> Progress tracking.
 *
 * Rules that matter (also enforced in firestore.rules, not only here):
 * - A homeowner can choose a pathway and sign up for a published session.
 * - Only staff can mark a session "completed" (verified) or grant a documents exception.
 * - Document submission opens only after verified completion or a recorded staff exception.
 * - Nothing here invents appointments, classes, events, or attendance.
 */

import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
  type Timestamp,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { isFirebaseConfigured, SUPPORT_PHONE } from "./config";

export type PathwayType = "counselor" | "class" | "event" | "home_visit";
export type PathwayStatus = "not_selected" | "scheduled" | "in_progress" | "completed" | "needs_staff";
export type MeetingMode = "video" | "phone" | "in_person" | "home";

export interface Session {
  itemId: string;
  title: string;
  startsAt?: string; // ISO date
  mode?: MeetingMode;
  location?: string;
  joinUrl?: string;
}

export interface Journey {
  pathway: PathwayType | null;
  status: PathwayStatus;
  session: Session | null;
  /** Set by staff only. */
  verified: { by: string; at: string } | null;
  /** Set by staff only, with a reason. */
  docsException: { by: string; reason: string; at: string } | null;
  /** When the homeowner asked for an in-home visit (staff then set the time). */
  requestedAt?: string | null;
}

export const EMPTY_JOURNEY: Journey = {
  pathway: null,
  status: "not_selected",
  session: null,
  verified: null,
  docsException: null,
};

export const PATHWAYS: Record<PathwayType, { title: string; short: string; href: string; action: string }> = {
  counselor: { title: "Meet with a housing counselor", short: "Counselor meeting", href: "/schedule", action: "Set up your meeting" },
  class: { title: "Take an online class", short: "Online class", href: "/classes", action: "Sign up for a class" },
  event: { title: "Attend an in-person event", short: "In-person event", href: "/events", action: "Sign up for an event" },
  home_visit: { title: "Request an in-home visit", short: "In-home visit", href: "/home-visit", action: "Request your visit" },
};

export function statusLabel(j: Journey): string {
  switch (j.status) {
    case "not_selected":
      if (j.pathway === "home_visit" && j.requestedAt) return "Requested. We'll call you to set a time";
      return j.pathway ? "Not scheduled yet" : "Not selected";
    case "scheduled":
      return j.pathway === "class" ? "Enrolled" : "Scheduled";
    case "in_progress":
      return "In progress";
    case "completed":
      return j.verified ? "Completed" : "Waiting for staff to check";
    case "needs_staff":
      return "Our staff will help you";
  }
}

/** Documents open only after staff-verified completion, or a recorded staff exception. */
export function canSubmitDocuments(j: Journey): boolean {
  return (j.status === "completed" && !!j.verified) || !!j.docsException;
}

export function fmtWhen(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const day = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${day} at ${time}`;
}

const DEVICE_KEY = "shm_journey_v1";

function readDevice(): Journey {
  try {
    const raw = localStorage.getItem(DEVICE_KEY);
    if (!raw) return EMPTY_JOURNEY;
    const p = JSON.parse(raw);
    // On this device we only remember the choice. Bookings and verification live in the cloud.
    const pathway = ["counselor", "class", "event", "home_visit"].includes(p.pathway) ? (p.pathway as PathwayType) : null;
    const status: PathwayStatus = p.status === "needs_staff" ? "needs_staff" : "not_selected";
    return { ...EMPTY_JOURNEY, pathway, status };
  } catch {
    return EMPTY_JOURNEY;
  }
}

function writeDevice(j: Pick<Journey, "pathway" | "status">) {
  try {
    localStorage.setItem(DEVICE_KEY, JSON.stringify({ pathway: j.pathway, status: j.status }));
  } catch {
    /* storage unavailable */
  }
}

function toIso(v: unknown): string | undefined {
  if (!v) return undefined;
  if (typeof v === "string") return v;
  const t = v as Timestamp;
  if (typeof t.toDate === "function") return t.toDate().toISOString();
  return undefined;
}

function fromCloud(data: Record<string, unknown> | undefined): Journey {
  if (!data) return EMPTY_JOURNEY;
  const v = data.verified as { by?: string; at?: unknown } | null | undefined;
  const e = data.docsException as { by?: string; reason?: string; at?: unknown } | null | undefined;
  const s = data.session as (Session & { startsAt?: unknown }) | null | undefined;
  return {
    pathway: (data.pathway as PathwayType) ?? null,
    status: (data.status as PathwayStatus) ?? "not_selected",
    session: s ? { ...s, startsAt: toIso(s.startsAt) } : null,
    verified: v?.by ? { by: v.by, at: toIso(v.at) ?? "" } : null,
    docsException: e?.by && e?.reason ? { by: e.by, reason: e.reason, at: toIso(e.at) ?? "" } : null,
    requestedAt: toIso(data.requestedAt) ?? null,
  };
}

export type JourneyMode = "cloud" | "device";

export function useJourney() {
  const [user, setUser] = useState<User | null>(null);
  const [journey, setJourney] = useState<Journey>(EMPTY_JOURNEY);
  const [loading, setLoading] = useState(true);
  const mode: JourneyMode = isFirebaseConfigured && user ? "cloud" : "device";

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setJourney(readDevice());
      setLoading(false);
      return;
    }
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u || !db) {
        setJourney(readDevice());
        setLoading(false);
        return;
      }
      try {
        const snap = await getDoc(doc(db, "journeys", u.uid));
        setJourney(fromCloud(snap.data()));
      } catch {
        setJourney(readDevice());
      }
      setLoading(false);
    });
  }, []);

  const save = useCallback(
    async (next: Journey) => {
      setJourney(next);
      if (mode === "cloud" && user && db) {
        await setDoc(
          doc(db, "journeys", user.uid),
          { pathway: next.pathway, status: next.status, session: next.session, requestedAt: next.requestedAt ?? null, updatedAt: serverTimestamp() },
          { merge: true }
        );
      } else {
        writeDevice(next);
      }
    },
    [mode, user]
  );

  /** Choosing (or changing) a pathway clears any earlier booking. It never marks anything completed. */
  const choosePathway = useCallback(
    (pathway: PathwayType) => save({ ...journey, pathway, status: "not_selected", session: null, requestedAt: null }),
    [journey, save]
  );

  const askForStaffHelp = useCallback(() => save({ ...journey, status: "needs_staff" }), [journey, save]);

  /** Sign up for a real, published session. Only works with the cloud turned on. */
  const signUp = useCallback(
    async (kind: "meeting" | "class" | "event", session: Session): Promise<{ ok: boolean; message?: string }> => {
      if (mode !== "cloud" || !user || !db) {
        return {
          ok: false,
          message: `Online sign-up isn't turned on yet. Please call us at ${SUPPORT_PHONE} and we'll sign you up.`,
        };
      }
      try {
        await addDoc(collection(db, "registrations"), {
          uid: user.uid,
          kind,
          itemId: session.itemId,
          mode: session.mode ?? null,
          status: "scheduled",
          createdAt: serverTimestamp(),
        });
        const pathway: PathwayType = kind === "meeting" ? "counselor" : kind;
        await save({ ...journey, pathway, status: "scheduled", session });
        return { ok: true };
      } catch {
        return { ok: false, message: `We couldn't save that. Please try again or call us at ${SUPPORT_PHONE}.` };
      }
    },
    [mode, user, journey, save]
  );

  /** Ask for an in-home visit. Staff call to set the time, then schedule and later verify it. */
  const requestVisit = useCallback(
    async (details: { days: string[]; timeOfDay: string; notes: string; photoConsent: boolean }): Promise<{ ok: boolean; message?: string }> => {
      if (mode !== "cloud" || !user || !db) {
        return {
          ok: false,
          message: `Online requests aren't turned on yet. Please call us at ${SUPPORT_PHONE} and we'll set up your visit.`,
        };
      }
      try {
        await addDoc(collection(db, "visitRequests"), {
          uid: user.uid,
          days: details.days,
          timeOfDay: details.timeOfDay,
          notes: details.notes.slice(0, 1000),
          photoConsent: details.photoConsent,
          status: "requested",
          createdAt: serverTimestamp(),
        });
        await save({ ...journey, pathway: "home_visit", status: "not_selected", session: null, requestedAt: new Date().toISOString() });
        return { ok: true };
      } catch {
        return { ok: false, message: `We couldn't send that. Please try again or call us at ${SUPPORT_PHONE}.` };
      }
    },
    [mode, user, journey, save]
  );

  /**
   * Ask to enroll in the optional Guided Application Support service.
   * No payment is taken in the app. Staff contact the homeowner about payment or a fee waiver.
   */
  const requestService = useCallback(
    async (opts: { waiverRequested: boolean }): Promise<{ ok: boolean; message?: string }> => {
      if (mode !== "cloud" || !user || !db) {
        return {
          ok: false,
          message: `Online sign-up isn't turned on yet. Please call us at ${SUPPORT_PHONE} to sign up or ask about a fee waiver.`,
        };
      }
      try {
        await addDoc(collection(db, "serviceRequests"), {
          uid: user.uid,
          service: "guided_application_support",
          feeShown: "$150",
          agreedToTerms: true,
          waiverRequested: opts.waiverRequested,
          status: "requested",
          createdAt: serverTimestamp(),
        });
        return { ok: true };
      } catch {
        return { ok: false, message: `We couldn't send that. Please try again or call us at ${SUPPORT_PHONE}.` };
      }
    },
    [mode, user]
  );

  return { journey, loading, mode, user, choosePathway, askForStaffHelp, signUp, requestVisit, requestService };
}

// ---------- Published sessions (entered by staff) ----------

export interface MeetingSlot {
  id: string;
  startsAt: string;
  modes: MeetingMode[];
  location?: string;
}

export interface ClassItem {
  id: string;
  title: string;
  description?: string;
  provider?: string;
  durationMinutes?: number;
  enrollUrl?: string;
}

export interface EventItem {
  id: string;
  title: string;
  startsAt: string;
  endsAt?: string;
  locationName?: string;
  address?: string;
  accessibility?: string;
  seatsLeft?: number;
}

type Kind = "availability" | "classes" | "events";

/** Reads only staff-published items. Returns available=false when the cloud isn't set up. */
export async function listPublished<T>(kind: Kind): Promise<{ available: boolean; items: T[] }> {
  if (!isFirebaseConfigured || !db) return { available: false, items: [] };
  try {
    const snap = await getDocs(query(collection(db, kind), where("published", "==", true)));
    const now = Date.now();
    const items = snap.docs
      .map((d) => {
        const data = d.data() as Record<string, unknown>;
        return { ...data, id: d.id, startsAt: toIso(data.startsAt), endsAt: toIso(data.endsAt) } as unknown as T & { startsAt?: string };
      })
      .filter((it) => !it.startsAt || new Date(it.startsAt).getTime() > now)
      .sort((a, b) => (a.startsAt ?? "").localeCompare(b.startsAt ?? ""));
    return { available: true, items };
  } catch {
    return { available: false, items: [] };
  }
}
