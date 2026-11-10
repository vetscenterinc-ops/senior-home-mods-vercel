"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { SubPage, btnPrimary } from "@/components/ui/SubPage";

// Figures from USDA's Section 504 Home Repair program page (checked Nov 2026).
// If USDA changes them, update them here.
function AmountCard({ label, amount, sub, points }: { label: string; amount: string; sub: string; points: string[] }) {
  return (
    <section aria-label={label} className="rounded-[22px] bg-white border border-hairline p-5 shadow-[0_4px_20px_rgba(60,40,10,0.07)]">
      <h2 className="font-bold text-[18px] text-navy">{label}</h2>
      <p className="font-[family-name:var(--font-fraunces)] font-semibold text-[42px] leading-tight text-navy">{amount}</p>
      <p className="text-[16px] font-bold text-muted">{sub}</p>
      <ul className="mt-2 space-y-1">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-2 text-[17px] text-navy">
            <Check className="w-5 h-5 text-leaf-text stroke-[3] shrink-0" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function AssistanceOptionsPage() {
  return (
    <SubPage
      eyebrow="YOUR ASSISTANCE OPTIONS"
      title="Understanding Home Repair Assistance"
      intro="We connect you with programs that offer loans and grants to eligible homeowners in qualifying rural areas. The two types of help have different purposes and rules."
      showTabs={false}
    >
      <AmountCard label="Home Repair Loan" amount="$40,000" sub="Maximum loan" points={["1% fixed interest", "20-year repayment term"]} />
      <AmountCard label="Home Repair Grant" amount="$10,000" sub="Lifetime grant limit" points={["For health and safety hazards", "Age 62 or older"]} />

      <section aria-label="Potential combined assistance" className="rounded-[22px] bg-navy p-5 shadow-[0_4px_20px_rgba(11,42,74,0.18)]">
        <div className="flex items-center gap-2">
          <span className="w-6 h-[2px] bg-gold" aria-hidden="true" />
          <span className="text-gold-on-navy text-[14px] font-semibold tracking-[0.14em] uppercase font-[family-name:var(--font-montserrat)]">
            Potential combined assistance
          </span>
        </div>
        <p className="font-[family-name:var(--font-fraunces)] font-semibold text-[42px] leading-tight text-white">$50,000</p>
        <p className="text-[17px] text-cream-on-navy">Subject to eligibility and USDA approval</p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-fraunces)] font-semibold text-[22px] text-navy">What can the assistance pay for?</h2>
        <p className="text-[17px] text-navy leading-relaxed"><strong>Loans:</strong> repair, improve, or modernize a home, including removing health and safety hazards.</p>
        <p className="text-[17px] text-navy leading-relaxed"><strong>Grants:</strong> remove health and safety hazards.</p>
      </section>

      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-fraunces)] font-semibold text-[22px] text-navy">Important terms</h2>
        <ul className="list-disc pl-5 space-y-1 text-[17px] text-navy leading-relaxed">
          <li>Loans above $25,000 need full title service.</li>
          <li>Grants must be paid back if the home is sold within 3 years.</li>
        </ul>
      </section>

      <Link href="/check" className={btnPrimary}>Continue learning</Link>
    </SubPage>
  );
}
