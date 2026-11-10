"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, Clock, Check, Users, ChevronRight } from "lucide-react";
import { SubPage, EmptyState, btnPrimary } from "@/components/ui/SubPage";
import { useJourney, listPublished, statusLabel, type ClassItem } from "@/lib/journey";

export default function ClassesPage() {
  const { journey, signUp } = useJourney();
  const [classes, setClasses] = useState<ClassItem[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    listPublished<ClassItem>("classes").then((r) => setClasses(r.items));
  }, []);

  const enroll = async (c: ClassItem) => {
    const r = await signUp("class", { itemId: c.id, title: c.title, joinUrl: c.enrollUrl });
    if (r.ok) {
      setMessage(`You're enrolled in "${c.title}".`);
      if (c.enrollUrl) window.open(c.enrollUrl, "_blank", "noopener,noreferrer");
    } else setMessage(r.message ?? "Something went wrong.");
  };

  return (
    <SubPage
      eyebrow="CLASSES & WORKSHOPS"
      title="Online classes"
      intro="Learn about the program and how to prepare your application. When you finish, the class tells us, and your status updates."
    >
      {message && (
        <p role="status" aria-live="polite" className="p-4 rounded-[14px] bg-sand border border-hairline text-[17px] text-navy">{message}</p>
      )}

      {classes === null ? (
        <p className="text-[17px] text-muted" role="status">Looking for classes…</p>
      ) : classes.length === 0 ? (
        <EmptyState
          icon={<GraduationCap className="w-7 h-7" />}
          title="No classes are posted right now"
          text="Call us and we'll tell you when the next class opens, or choose a different option."
        />
      ) : (
        <ul className="space-y-4">
          {classes.map((c) => {
            const mine = journey.session?.itemId === c.id;
            const done = mine && journey.status === "completed" && !!journey.verified;
            return (
              <li key={c.id} className={`rounded-[22px] bg-white p-5 space-y-3 ${mine ? "border-2 border-navy" : "border border-hairline"}`}>
                <h2 className="font-[family-name:var(--font-fraunces)] font-semibold text-[21px] text-navy">{c.title}</h2>
                {c.description && <p className="text-[17px] text-muted leading-relaxed">{c.description}</p>}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[16px] text-navy">
                  {c.durationMinutes ? (
                    <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" aria-hidden="true" /> About {c.durationMinutes} minutes</span>
                  ) : null}
                  {c.provider && <span>From {c.provider}</span>}
                </div>
                {mine ? (
                  <p className={`inline-flex items-center gap-2 text-[17px] font-bold ${done ? "text-leaf-text" : "text-gold-text"}`}>
                    {done && <Check className="w-5 h-5 stroke-[3]" aria-hidden="true" />}
                    Your status: {statusLabel(journey)}
                  </p>
                ) : (
                  <button type="button" onClick={() => enroll(c)} className={btnPrimary}>Enroll in this class</button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <Link
        href="/events"
        className="flex items-center gap-3 p-4 rounded-[18px] bg-white border border-hairline min-h-[64px] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
      >
        <Users className="w-6 h-6 text-navy" aria-hidden="true" />
        <span className="flex-1 font-bold text-[18px] text-navy">In-person workshops</span>
        <ChevronRight className="w-5 h-5 text-gold-text" aria-hidden="true" />
      </Link>
    </SubPage>
  );
}
