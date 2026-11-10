"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { SubPage } from "@/components/ui/SubPage";
import { useJourney, PATHWAYS, canSubmitDocuments, statusLabel } from "@/lib/journey";

type StageState = "done" | "current" | "upcoming";

export default function ProgressPage() {
  const { journey } = useJourney();
  const educationDone = journey.status === "completed" && !!journey.verified;
  const docsOpen = canSubmitDocuments(journey);

  // Stages after Documents are moved forward by staff once that backend is connected.
  const stages: { name: string; text: string; state: StageState; link?: { href: string; label: string } }[] = [
    { name: "Prequalification", text: "Address check and a few questions.", state: "done" },
    {
      name: "Counseling or Education",
      text: journey.pathway
        ? `${PATHWAYS[journey.pathway].title}. Status: ${statusLabel(journey)}.`
        : "Meet with a counselor, take a class, or go to an event.",
      state: educationDone ? "done" : "current",
      link: educationDone ? undefined : journey.pathway ? { href: "/appointments", label: "See my session" } : { href: "/next-step", label: "Choose an option" },
    },
    {
      name: "Documents",
      text: docsOpen ? "Send the papers your counselor asked for." : "Opens after your session is checked by our staff.",
      state: docsOpen ? "current" : "upcoming",
      link: docsOpen ? { href: "/documents", label: "Send my papers" } : undefined,
    },
    { name: "Staff Review", text: "Our team checks your papers.", state: "upcoming" },
    { name: "Application Preparation", text: "We help you fill out the application.", state: "upcoming" },
    { name: "Referral or Submission", text: "We send your application to USDA or another program.", state: "upcoming" },
    { name: "Follow-Up", text: "We stay with you until the work is done.", state: "upcoming" },
  ];
  const currentIndex = stages.findIndex((s) => s.state === "current");

  return (
    <SubPage eyebrow={`STEP ${currentIndex + 1} OF 7`} title="Your progress" intro="Here's every step, from start to finish." showBack={false}>
      <ol className="relative space-y-5" aria-label="Your progress">
        {stages.map((s, i) => (
          <li key={s.name} className="relative flex gap-4" aria-current={s.state === "current" ? "step" : undefined}>
            {i < stages.length - 1 && (
              <div className={`absolute left-[17px] top-[38px] bottom-[-20px] w-[2px] ${s.state === "done" ? "bg-leaf" : "bg-sand-deep"}`} aria-hidden="true" />
            )}
            <div className="shrink-0" aria-hidden="true">
              {s.state === "done" ? (
                <div className="w-9 h-9 rounded-full bg-leaf text-white flex items-center justify-center"><Check className="w-5 h-5 stroke-[3]" /></div>
              ) : s.state === "current" ? (
                <div className="w-9 h-9 rounded-full bg-navy text-white font-bold text-[16px] flex items-center justify-center ring-4 ring-gold/40">{i + 1}</div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-white border-2 border-control text-muted font-bold text-[16px] flex items-center justify-center">{i + 1}</div>
              )}
            </div>
            <div className={`flex-1 ${s.state === "current" ? "p-4 -mt-1 rounded-[18px] bg-white border-2 border-navy" : "pt-1"}`}>
              <div className={`text-[18px] font-bold ${s.state === "upcoming" ? "text-muted" : "text-navy"}`}>
                {s.name}
                <span className="sr-only">{s.state === "done" ? ", done" : s.state === "current" ? ", current step" : ", coming up"}</span>
              </div>
              <p className="text-[16px] text-muted leading-relaxed">{s.text}</p>
              {s.link && (
                <Link href={s.link.href} className="mt-1 inline-flex items-center min-h-[48px] text-[17px] font-bold text-navy underline decoration-gold underline-offset-4">
                  {s.link.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </SubPage>
  );
}
