"use client";

import React from "react";
import Link from "next/link";
import { Check, Info } from "lucide-react";
import { TopBar } from "@/components/ui/TopBar";
import { PageTitle } from "@/components/ui/PageTitle";
import { btnPrimary } from "@/components/ui/SubPage";
import { SERVICE_FEE, SERVICE_INCLUDES } from "@/lib/config";

export default function ApplicationSupportPage() {
  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-4 pb-12 flex flex-col gap-5">
        <TopBar showBack={true} showCall={true} />

        <div className="w-16 h-16 rounded-full bg-leaf text-white flex items-center justify-center" aria-hidden="true">
          <Check className="w-9 h-9 stroke-[3]" />
        </div>

        <div className="space-y-3">
          <PageTitle>Great News! Let&apos;s Get Your Application Ready.</PageTitle>
          <p className="text-[18px] text-muted leading-relaxed">
            Based on your first screening, you may qualify for a home repair grant or loan. Our team can help you get ready for the next steps.
          </p>
        </div>

        <section aria-labelledby="pkg" className="rounded-[22px] bg-white border-2 border-navy p-5 shadow-[0_12px_28px_rgba(60,40,10,0.08)]">
          <h2 id="pkg" className="text-[17px] font-bold text-gold-text">Your Guided Application Support Package</h2>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-fraunces)] font-semibold text-[46px] leading-none text-navy">{SERVICE_FEE}</span>
            <span className="text-[17px] font-bold text-muted">one-time service fee</span>
          </p>
          <h3 className="mt-4 text-[18px] font-bold text-navy">What&apos;s included</h3>
          <ul className="mt-1 space-y-2">
            {SERVICE_INCLUDES.map((t) => (
              <li key={t} className="flex gap-2 text-[18px] text-navy leading-snug">
                <Check className="w-5 h-5 mt-0.5 text-leaf-text stroke-[3] shrink-0" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <p className="p-4 rounded-[16px] bg-sand border border-hairline text-[16px] text-navy leading-relaxed flex gap-2">
          <Info className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            <strong>This service is optional.</strong> The programs do not charge to apply. You can apply on your own, or get free help from a counselor. Can&apos;t afford the fee? Ask us about a fee waiver.
          </span>
        </p>

        <div className="space-y-2 pt-2">
          <Link href="/application-support/details" className={btnPrimary}>Continue With My Application</Link>
          <Link
            href="/application-support/details#other-options"
            className="flex items-center justify-center min-h-[48px] text-[18px] font-bold text-navy underline decoration-gold underline-offset-4"
          >
            View Service Details &amp; Other Options
          </Link>
        </div>
      </main>
    </div>
  );
}
