"use client";

import React, { useState } from "react";
import Link from "next/link";
import { House, Check, ShieldCheck, Phone } from "lucide-react";
import { SubPage, btnPrimary, btnSecondary } from "@/components/ui/SubPage";
import { Segmented } from "@/components/ui/Segmented";
import { useJourney, statusLabel } from "@/lib/journey";
import { SUPPORT_PHONE, SUPPORT_PHONE_TEL } from "@/lib/config";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function HomeVisitPage() {
  const { journey, requestVisit } = useJourney();
  const [days, setDays] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [notes, setNotes] = useState("");
  const [photoConsent, setPhotoConsent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const alreadyRequested = journey.pathway === "home_visit" && (!!journey.requestedAt || !!journey.session);

  const toggleDay = (d: string) => setDays((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));

  const submit = async () => {
    setSending(true);
    const r = await requestVisit({ days, timeOfDay, notes, photoConsent });
    setSending(false);
    setMessage(r.ok ? "Thank you. We got your request. Someone from our team will call you to set a time." : r.message ?? "Something went wrong.");
  };

  const safety = (
    <section aria-labelledby="safe" className="p-5 rounded-[20px] bg-sand border border-hairline space-y-2">
      <h2 id="safe" className="flex items-center gap-2 font-bold text-[18px] text-navy">
        <ShieldCheck className="w-6 h-6 text-leaf-text" aria-hidden="true" /> For your safety
      </h2>
      <ul className="list-disc pl-5 space-y-1 text-[17px] text-navy leading-relaxed">
        <li>We&apos;ll call you first to set the day and time.</li>
        <li>Our team member will show a photo ID badge.</li>
        <li>
          Not sure? Call us at{" "}
          <a href={`tel:${SUPPORT_PHONE_TEL}`} className="font-bold underline decoration-gold underline-offset-4 whitespace-nowrap">{SUPPORT_PHONE}</a>{" "}
          before you open the door.
        </li>
        <li>Never pay anyone at your door.</li>
        <li>You can ask a family member or friend to be there.</li>
      </ul>
    </section>
  );

  return (
    <SubPage
      eyebrow="IN-HOME VISIT"
      title="Request an in-home visit"
      intro="An authorized team member can visit your home, take photographs of repair concerns with your permission, and help collect the documents needed for your application."
    >
      {alreadyRequested || message?.startsWith("Thank you") ? (
        <div className="rounded-[22px] bg-white border-2 border-navy p-6 space-y-4">
          <div className="w-14 h-14 rounded-full bg-leaf text-white flex items-center justify-center" aria-hidden="true">
            <Check className="w-7 h-7 stroke-[3]" />
          </div>
          <h2 className="font-[family-name:var(--font-fraunces)] font-semibold text-[22px] text-navy">Your visit is requested</h2>
          <p className="text-[17px] text-navy" role="status">Status: {statusLabel(journey)}</p>
          <Link href="/appointments" className={btnPrimary}>See my visit</Link>
          <Link href="/next-step" className={btnSecondary}>Change My Option</Link>
        </div>
      ) : (
        <>
          <fieldset className="space-y-2">
            <legend className="font-bold text-[18px] text-navy">Which days work best? <span className="font-normal text-muted text-[16px]">(pick any)</span></legend>
            <div className="flex flex-wrap gap-2 pt-1">
              {DAYS.map((d) => {
                const on = days.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleDay(d)}
                    className={`min-h-[48px] px-4 rounded-full border-2 font-bold text-[17px] inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus ${
                      on ? "bg-navy border-navy text-white" : "bg-white border-control text-navy"
                    }`}
                  >
                    {on && <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />}
                    {d}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="space-y-2">
            <span className="block font-bold text-[18px] text-navy">What time of day?</span>
            <Segmented
              label="What time of day?"
              options={[
                { value: "morning", label: "Morning" },
                { value: "afternoon", label: "Afternoon" },
              ]}
              value={timeOfDay}
              onChange={setTimeOfDay}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="block font-bold text-[18px] text-navy">
              Anything we should know? <span className="font-normal text-muted text-[16px]">(if you want)</span>
            </label>
            <p id="notes-hint" className="text-[16px] text-muted">Like pets, steps at the door, or someone who should be there.</p>
            <textarea
              id="notes"
              aria-describedby="notes-hint"
              rows={3}
              maxLength={1000}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-4 rounded-[14px] border-2 border-control bg-white text-[18px] text-navy resize-none focus-visible:outline-none focus-visible:border-navy focus-visible:ring-3 focus-visible:ring-focus"
            />
          </div>

          <button
            type="button"
            role="checkbox"
            aria-checked={photoConsent}
            onClick={() => setPhotoConsent((v) => !v)}
            className="w-full flex items-start gap-3 p-4 rounded-[16px] bg-white border-2 border-hairline text-left focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
          >
            <span
              className={`w-7 h-7 rounded-[8px] border-2 flex items-center justify-center shrink-0 ${photoConsent ? "bg-navy border-navy" : "border-control bg-white"}`}
              aria-hidden="true"
            >
              {photoConsent && <Check className="w-5 h-5 text-white stroke-[3]" />}
            </span>
            <span className="text-[17px] text-navy leading-relaxed">
              <strong>You may take photos</strong> of repair concerns in my home.
              <span className="block text-muted text-[16px]">You can change your mind at the visit.</span>
            </span>
          </button>

          {safety}

          {message && (
            <p role="alert" className="p-4 rounded-[14px] bg-sand border border-hairline text-[17px] text-navy">{message}</p>
          )}

          <button type="button" onClick={submit} disabled={sending} className={`${btnPrimary} disabled:opacity-50`}>
            <House className="w-5 h-5" aria-hidden="true" />
            {sending ? "Sending…" : "Send My Request"}
          </button>
          <a href={`tel:${SUPPORT_PHONE_TEL}`} className={btnSecondary}>
            <Phone className="w-5 h-5" aria-hidden="true" /> Or call us to set it up
          </a>
        </>
      )}
    </SubPage>
  );
}
