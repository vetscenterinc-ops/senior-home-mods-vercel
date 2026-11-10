"use client";

import React from "react";
import { ShieldCheck, Phone } from "lucide-react";
import { SubPage } from "@/components/ui/SubPage";
import { SUPPORT_PHONE, SUPPORT_PHONE_TEL } from "@/lib/config";

export default function PrivacyPage() {
  return (
    <SubPage eyebrow="ACCOUNT & SECURITY" title="Privacy & security" intro="Plain language about how we protect your information.">
      <div className="p-4 rounded-[16px] bg-sand border border-hairline flex items-start gap-3 text-[18px] text-navy">
        <ShieldCheck className="w-6 h-6 text-leaf-text shrink-0 mt-0.5" aria-hidden="true" />
        <p>Your personal information is never sold, rented, or shared with advertisers.</p>
      </div>

      <div className="space-y-5 text-[18px] text-navy leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-[family-name:var(--font-fraunces)] font-semibold text-[22px]">What we collect</h2>
          <p>Only what we need to help you: your address, how to reach you, answers about your home, and the papers your counselor asks for.</p>
        </section>
        <section className="space-y-2">
          <h2 className="font-[family-name:var(--font-fraunces)] font-semibold text-[22px]">How we keep it safe</h2>
          <p>Your information is encrypted while it travels and while it&apos;s stored. Only you, your counselor, and our staff can see your papers.</p>
        </section>
        <section className="space-y-2">
          <h2 className="font-[family-name:var(--font-fraunces)] font-semibold text-[22px]">Our chat helper</h2>
          <p>The chat helper is a computer program (AI), not a person. Please don&apos;t type your Social Security number, bank details, or passwords in the chat.</p>
        </section>
        <section className="space-y-2">
          <h2 className="font-[family-name:var(--font-fraunces)] font-semibold text-[22px]">Questions</h2>
          <a href={`tel:${SUPPORT_PHONE_TEL}`} className="inline-flex items-center gap-2 min-h-[48px] font-bold underline decoration-gold underline-offset-4">
            <Phone className="w-5 h-5" aria-hidden="true" /> <span>Call us at <span className="whitespace-nowrap">{SUPPORT_PHONE}</span></span>
          </a>
        </section>
      </div>
    </SubPage>
  );
}
