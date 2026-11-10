"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Video, Phone } from "lucide-react";
import { SubPage, btnPrimary, btnSecondary } from "@/components/ui/SubPage";
import { useJourney } from "@/lib/journey";
import { SERVICE_FEE, SERVICE_INCLUDES, SUPPORT_PHONE, SUPPORT_PHONE_TEL } from "@/lib/config";

export default function ServiceDetailsPage() {
  const router = useRouter();
  const { requestService, user, mode } = useJourney();
  const [agreed, setAgreed] = useState(false);
  const [waiver, setWaiver] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const submit = async () => {
    if (!agreed) {
      setResult({ ok: false, message: "Please confirm that you understand this optional service before continuing." });
      return;
    }
    if (mode !== "cloud" || !user) {
      setResult({ ok: false, message: "Your service request has not been submitted. Please sign in and return to this page, or choose a free support option below." });
      return;
    }
    setSending(true);
    const r = await requestService({ waiverRequested: waiver });
    setSending(false);
    if (r.ok) {
      router.push("/next-step");
      return;
    }
    setResult(
      r.ok
        ? {
            ok: true,
            message: waiver
              ? "Thank you. We got your request and your fee waiver question. Someone from our team will call you. You won't be charged until you agree on the call."
              : "Thank you. We got your request. Someone from our team will call you to get started. You won't be charged until you agree on the call.",
          }
        : { ok: false, message: r.message ?? "Something went wrong." }
    );
  };

  const box = (on: boolean) =>
    `w-7 h-7 rounded-[8px] border-2 flex items-center justify-center shrink-0 ${on ? "bg-navy border-navy" : "border-control bg-white"}`;

  return (
    <SubPage eyebrow="GUIDED APPLICATION SUPPORT" title="Service details" showTabs={false}>
      <section aria-labelledby="fee" className="rounded-[22px] bg-white border-2 border-navy p-5 space-y-3">
        <h2 id="fee" className="flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-fraunces)] font-semibold text-[40px] leading-none text-navy">{SERVICE_FEE}</span>
          <span className="text-[17px] font-bold text-muted">one-time service fee</span>
        </h2>
        <ul className="space-y-2">
          {SERVICE_INCLUDES.map((t) => (
            <li key={t} className="flex gap-2 text-[17px] text-navy">
              <Check className="w-5 h-5 mt-0.5 text-leaf-text stroke-[3] shrink-0" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="good" className="space-y-2">
        <h2 id="good" className="font-[family-name:var(--font-fraunces)] font-semibold text-[22px] text-navy">Good to know</h2>
        <ul className="list-disc pl-5 space-y-1 text-[17px] text-navy leading-relaxed">
          <li>This service is optional.</li>
          <li>The programs do not charge to apply. You can apply on your own.</li>
          <li>Paying for this service does not mean you will be approved.</li>
          <li>Can&apos;t afford the fee? You can ask for a fee waiver.</li>
          <li>Nothing is charged in this app. We&apos;ll explain payment on a call first.</li>
        </ul>
      </section>

      {result ? (
        <p role="status" className={`p-4 rounded-[16px] border text-[17px] leading-relaxed ${result.ok ? "bg-white border-leaf text-navy" : "bg-sand border-hairline text-navy"}`}>
          {result.message}
        </p>
      ) : (
        <section aria-label="Sign up" className="space-y-3">
          <button type="button" role="checkbox" aria-checked={agreed} onClick={() => setAgreed((v) => !v)}
            className="w-full flex items-start gap-3 p-4 rounded-[16px] bg-white border-2 border-hairline text-left focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus">
            <span className={box(agreed)} aria-hidden="true">{agreed && <Check className="w-5 h-5 text-white stroke-[3]" />}</span>
            <span id="service-acknowledgement" className="text-[17px] text-navy leading-relaxed">I understand this service costs {SERVICE_FEE} and is optional.</span>
          </button>
          <button type="button" role="checkbox" aria-checked={waiver} onClick={() => setWaiver((v) => !v)}
            className="w-full flex items-start gap-3 p-4 rounded-[16px] bg-white border-2 border-hairline text-left focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus">
            <span className={box(waiver)} aria-hidden="true">{waiver && <Check className="w-5 h-5 text-white stroke-[3]" />}</span>
            <span className="text-[17px] text-navy leading-relaxed">I&apos;d like to ask about a fee waiver.</span>
          </button>
          <button type="button" onClick={submit} disabled={sending} aria-describedby="service-acknowledgement" className={`${btnPrimary} disabled:opacity-50 disabled:cursor-not-allowed`}>
            {sending ? "Sending…" : "Request This Service"}
          </button>
          <a href={`tel:${SUPPORT_PHONE_TEL}`} className={btnSecondary}>
            <Phone className="w-5 h-5" aria-hidden="true" /> <span>Questions? Call <span className="whitespace-nowrap">{SUPPORT_PHONE}</span></span>
          </a>
        </section>
      )}

      <section id="other-options" aria-labelledby="free" className="rounded-[22px] bg-sand border border-hairline p-5 space-y-3 scroll-mt-6">
        <h2 id="free" className="font-[family-name:var(--font-fraunces)] font-semibold text-[22px] text-navy">Other options at no cost</h2>
        <p className="text-[17px] text-navy leading-relaxed">
          Meet with a HUD housing counselor, take an online class, go to a workshop, or ask for a home visit.
        </p>
        <Link href="/next-step" className={btnPrimary}>
          <Video className="w-5 h-5" aria-hidden="true" /> See free options
        </Link>
      </section>
    </SubPage>
  );
}
