"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Check, Camera, Upload, Lock, CalendarDays, RefreshCw, LifeBuoy } from "lucide-react";
import { SubPage, btnPrimary, btnSecondary } from "@/components/ui/SubPage";
import { useJourney, canSubmitDocuments } from "@/lib/journey";

export default function DocumentsPage() {
  const { journey, loading } = useJourney();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [picked, setPicked] = useState<string | null>(null);

  const open = canSubmitDocuments(journey);

  // Real upload to private storage is connected in the backend phase (Firebase Storage + rules).
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPicked(file.name);
    e.target.value = "";
  };

  const usdaNote = (
    <p className="text-[16px] text-muted leading-relaxed">
      You can always contact your local USDA office or other programs yourself.{" "}
      <Link href="/usda-office" className="font-bold text-navy underline decoration-gold underline-offset-4">Find a local office</Link>
    </p>
  );

  if (loading) {
    return (
      <SubPage eyebrow="MY DOCUMENTS" title="Your papers">
        <p className="text-[17px] text-muted" role="status">Loading…</p>
      </SubPage>
    );
  }

  if (!open) {
    return (
      <SubPage eyebrow="MY DOCUMENTS" title="You're almost ready to submit your documents.">
        <div className="rounded-[22px] bg-white border border-hairline p-6 space-y-5 shadow-[0_4px_20px_rgba(60,40,10,0.07)]">
          <div className="w-14 h-14 rounded-full bg-sand text-navy flex items-center justify-center" aria-hidden="true">
            <Lock className="w-7 h-7" />
          </div>
          <p className="text-[18px] text-navy leading-relaxed">
            First, complete your counselor meeting, online class, in-person workshop, or home visit so we can help you prepare the right paperwork.
          </p>
          <div className="space-y-3">
            <Link href="/appointments" className={btnPrimary}>
              <CalendarDays className="w-5 h-5" aria-hidden="true" />
              View My Scheduled Session
            </Link>
            <Link href="/next-step" className={btnSecondary}>
              <RefreshCw className="w-5 h-5" aria-hidden="true" />
              Choose a Different Option
            </Link>
            <Link href="/help" className={btnSecondary}>
              <LifeBuoy className="w-5 h-5" aria-hidden="true" />
              Contact Support
            </Link>
          </div>
        </div>
        <p className="text-[16px] text-muted leading-relaxed">
          Need to send papers sooner, or need another way to send them? Our staff can help. Just contact support.
        </p>
        {usdaNote}
      </SubPage>
    );
  }

  const papers = [
    { id: "id", title: "Photo ID" },
    { id: "deed", title: "Home deed", detail: "Shows you own the home" },
    { id: "income", title: "Proof of income", detail: "Like a Social Security letter" },
    { id: "doctor", title: "Doctor's letter", detail: "Only if you have one" },
  ];

  return (
    <SubPage
      eyebrow="MY DOCUMENTS"
      title="Send your papers"
      intro={journey.docsException ? "Our staff opened this for you." : "Your session is done and checked. Send the papers your counselor asked for."}
    >
      <div className="p-4 rounded-[16px] bg-sand border border-hairline flex items-center gap-3 text-[16px] text-navy">
        <ShieldCheck className="w-6 h-6 text-leaf-text shrink-0 stroke-[2]" aria-hidden="true" />
        <span>Safe and private. Only your counselor and our team can see them.</span>
      </div>

      <ul className="rounded-[22px] bg-white border border-hairline divide-y divide-hairline">
        {papers.map((p) => (
          <li key={p.id} className="p-4">
            <div className="font-bold text-[18px] text-navy">{p.title}</div>
            {p.detail && <div className="text-[16px] text-muted">{p.detail}</div>}
          </li>
        ))}
      </ul>

      {picked && (
        <p role="status" aria-live="polite" className="p-4 rounded-[14px] bg-sand border border-hairline text-[17px] text-navy flex gap-2">
          <Check className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          Picked: {picked}. Sending to your private file will be turned on soon. For now, bring it to your counselor or call us.
        </p>
      )}

      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" aria-label="Take a photo of a paper" onChange={handleFileChange} />
      <input ref={fileInputRef} type="file" className="hidden" aria-label="Choose a file" onChange={handleFileChange} />
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => cameraInputRef.current?.click()} className={btnPrimary}>
          <Camera className="w-5 h-5" aria-hidden="true" /> Take a photo
        </button>
        <button type="button" onClick={() => fileInputRef.current?.click()} className={btnSecondary}>
          <Upload className="w-5 h-5" aria-hidden="true" /> Choose file
        </button>
      </div>
      {usdaNote}
    </SubPage>
  );
}
