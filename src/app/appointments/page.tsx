"use client";

import React from "react";
import Link from "next/link";
import { CalendarDays, Check, MapPin, Video, Phone } from "lucide-react";
import { SubPage, EmptyState, btnPrimary, btnSecondary } from "@/components/ui/SubPage";
import { useJourney, PATHWAYS, fmtWhen, statusLabel } from "@/lib/journey";

export default function AppointmentsPage() {
  const { journey, loading } = useJourney();
  const s = journey.session;
  const path = journey.pathway ? PATHWAYS[journey.pathway] : null;
  const verified = journey.status === "completed" && !!journey.verified;

  return (
    <SubPage eyebrow="MY ASSISTANCE" title="Appointments">
      {loading ? (
        <p className="text-[17px] text-muted" role="status">Loading…</p>
      ) : !s ? (
        <EmptyState
          icon={<CalendarDays className="w-7 h-7" />}
          title="Nothing scheduled yet"
          text={path ? `You chose: ${path.title}. Pick a time to get on the calendar.` : "Choose how you'd like to get started."}
        >
          <Link href={path ? path.href : "/next-step"} className={btnPrimary}>{path ? path.action : "See my options"}</Link>
        </EmptyState>
      ) : (
        <div className="rounded-[22px] bg-white border-2 border-navy p-5 space-y-3">
          <span className="text-[15px] font-bold text-gold-text">{path?.short}</span>
          <h2 className="font-[family-name:var(--font-fraunces)] font-semibold text-[21px] text-navy">{s.title}</h2>
          <ul className="space-y-2 text-[17px] text-navy">
            {s.startsAt && <li className="flex gap-2"><CalendarDays className="w-5 h-5 mt-0.5 text-gold-text shrink-0" aria-hidden="true" />{fmtWhen(s.startsAt)}</li>}
            {s.mode === "video" && <li className="flex gap-2"><Video className="w-5 h-5 mt-0.5 text-gold-text shrink-0" aria-hidden="true" />Video call. We&apos;ll text you the link.</li>}
            {s.mode === "phone" && <li className="flex gap-2"><Phone className="w-5 h-5 mt-0.5 text-gold-text shrink-0" aria-hidden="true" />Your counselor will call you.</li>}
            {s.mode === "home" && <li className="flex gap-2"><MapPin className="w-5 h-5 mt-0.5 text-gold-text shrink-0" aria-hidden="true" />At your home. Our team member will show a photo ID badge.</li>}
            {s.location && <li className="flex gap-2"><MapPin className="w-5 h-5 mt-0.5 text-gold-text shrink-0" aria-hidden="true" />{s.location}</li>}
          </ul>
          <p className={`text-[17px] font-bold inline-flex items-center gap-2 ${verified ? "text-leaf-text" : "text-navy"}`}>
            {verified && <Check className="w-5 h-5 stroke-[3]" aria-hidden="true" />}
            Status: {statusLabel(journey)}
          </p>
          {s.joinUrl && !verified && (
            <a href={s.joinUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              {journey.pathway === "class" ? "Open my class" : "Join"}
            </a>
          )}
          <Link href="/next-step" className={btnSecondary}>Change My Option</Link>
        </div>
      )}
    </SubPage>
  );
}
