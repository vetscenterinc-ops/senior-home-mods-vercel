"use client";

import React, { useEffect, useState } from "react";
import { Users, MapPin, Clock, Accessibility, Check } from "lucide-react";
import { SubPage, EmptyState, btnPrimary } from "@/components/ui/SubPage";
import { useJourney, listPublished, fmtWhen, statusLabel, type EventItem } from "@/lib/journey";

export default function EventsPage() {
  const { journey, signUp } = useJourney();
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    listPublished<EventItem>("events").then((r) => setEvents(r.items));
  }, []);

  const register = async (e: EventItem) => {
    const where = [e.locationName, e.address].filter(Boolean).join(", ");
    const r = await signUp("event", { itemId: e.id, title: e.title, startsAt: e.startsAt, mode: "in_person", location: where });
    setMessage(r.ok ? `You're signed up for "${e.title}". We'll send a reminder.` : r.message ?? "Something went wrong.");
  };

  return (
    <SubPage
      eyebrow="CLASSES & WORKSHOPS"
      title="In-person events"
      intro="Join a local workshop and get help understanding the application process. Our staff checks you in at the event."
    >
      {message && (
        <p role="status" aria-live="polite" className="p-4 rounded-[14px] bg-sand border border-hairline text-[17px] text-navy">{message}</p>
      )}

      {events === null ? (
        <p className="text-[17px] text-muted" role="status">Looking for events…</p>
      ) : events.length === 0 ? (
        <EmptyState
          icon={<Users className="w-7 h-7" />}
          title="No events are posted right now"
          text="Call us and we'll tell you about the next workshop near you, or choose a different option."
        />
      ) : (
        <ul className="space-y-4">
          {events.map((e) => {
            const mine = journey.session?.itemId === e.id;
            const full = typeof e.seatsLeft === "number" && e.seatsLeft <= 0;
            return (
              <li key={e.id} className={`rounded-[22px] bg-white p-5 space-y-3 ${mine ? "border-2 border-navy" : "border border-hairline"}`}>
                <h2 className="font-[family-name:var(--font-fraunces)] font-semibold text-[21px] text-navy">{e.title}</h2>
                <ul className="space-y-2 text-[17px] text-navy">
                  <li className="flex gap-2"><Clock className="w-5 h-5 shrink-0 mt-0.5 text-gold-text" aria-hidden="true" /><span>{fmtWhen(e.startsAt)}</span></li>
                  {(e.locationName || e.address) && (
                    <li className="flex gap-2"><MapPin className="w-5 h-5 shrink-0 mt-0.5 text-gold-text" aria-hidden="true" /><span>{[e.locationName, e.address].filter(Boolean).join(", ")}</span></li>
                  )}
                  {e.accessibility && (
                    <li className="flex gap-2"><Accessibility className="w-5 h-5 shrink-0 mt-0.5 text-gold-text" aria-hidden="true" /><span>{e.accessibility}</span></li>
                  )}
                </ul>
                {mine ? (
                  <p className="inline-flex items-center gap-2 text-[17px] font-bold text-leaf-text">
                    <Check className="w-5 h-5 stroke-[3]" aria-hidden="true" /> Your status: {statusLabel(journey)}
                  </p>
                ) : full ? (
                  <p className="text-[17px] font-bold text-muted">This event is full.</p>
                ) : (
                  <button type="button" onClick={() => register(e)} className={btnPrimary}>Sign me up</button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </SubPage>
  );
}
