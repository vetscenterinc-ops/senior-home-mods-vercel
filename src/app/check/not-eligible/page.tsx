"use client";

import React from "react";
import Link from "next/link";
import { House, Zap, Accessibility, Flag, Landmark, Search, Phone } from "lucide-react";
import { SubPage, btnPrimary, btnSecondary } from "@/components/ui/SubPage";

const KINDS = [
  { icon: House, label: "Home repair and rehabilitation grants" },
  { icon: Zap, label: "Weatherization and energy improvements" },
  { icon: Accessibility, label: "Accessibility and aging-in-place changes" },
  { icon: Flag, label: "Veteran home modification programs" },
  { icon: Landmark, label: "Local government and nonprofit help" },
];

export default function NotEligiblePage() {
  return (
    <SubPage
      eyebrow="YOUR RESULT"
      title="You may have other options."
      intro="Based on your answers, other home repair programs may be available in your area."
      showTabs={false}
    >
      <section aria-labelledby="explore" className="rounded-[22px] bg-white border border-hairline p-5 space-y-3 shadow-[0_4px_20px_rgba(60,40,10,0.07)]">
        <h2 id="explore" className="font-[family-name:var(--font-fraunces)] font-semibold text-[22px] text-navy">Let&apos;s explore other programs</h2>
        <p className="text-[17px] text-muted leading-relaxed">
          We&apos;ll use your location, household information, and repair needs to find programs worth exploring.
        </p>
        <h3 className="text-[16px] font-bold text-gold-text">Assistance we can look for</h3>
        <ul className="divide-y divide-hairline">
          {KINDS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 py-3">
              <span className="w-11 h-11 rounded-full bg-sand text-navy flex items-center justify-center shrink-0" aria-hidden="true">
                <Icon className="w-5 h-5" />
              </span>
              <span className="text-[17px] font-bold text-navy">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="space-y-3">
        <Link href="/assistance" className={btnPrimary}>
          <Search className="w-5 h-5" aria-hidden="true" /> Locate Other Programs
        </Link>
        <Link href="/schedule" className={btnSecondary}>
          <Phone className="w-5 h-5" aria-hidden="true" /> Speak to a Counselor
        </Link>
        <Link href="/check" className="flex items-center justify-center min-h-[48px] text-[17px] font-bold text-navy underline decoration-gold underline-offset-4">
          Check a different address
        </Link>
      </div>
    </SubPage>
  );
}
