"use client";

import React from "react";
import { Landmark, ExternalLink } from "lucide-react";
import { SubPage, btnPrimary, btnSecondary } from "@/components/ui/SubPage";
import { USDA_OFFICE_FINDER_URL, USDA_504_PROGRAM_URL } from "@/lib/config";

export default function UsdaOfficePage() {
  return (
    <SubPage
      eyebrow="RESOURCES & SUPPORT"
      title="Find a local office"
      intro="You can always contact your local USDA office yourself. We're glad to help, but you never have to go through us."
    >
      <div className="rounded-[22px] bg-white border border-hairline p-6 space-y-4 shadow-[0_4px_20px_rgba(60,40,10,0.07)]">
        <div className="w-14 h-14 rounded-full bg-sand text-navy flex items-center justify-center" aria-hidden="true">
          <Landmark className="w-7 h-7" />
        </div>
        <p className="text-[18px] text-navy leading-relaxed">
          USDA Rural Development has local offices in every state. Pick your state on their website to see your nearest office.
        </p>
        <a href={USDA_OFFICE_FINDER_URL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
          Find my local USDA office <ExternalLink className="w-5 h-5" aria-hidden="true" />
          <span className="sr-only">(opens the USDA website)</span>
        </a>
        <a href={USDA_504_PROGRAM_URL} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
          About the USDA home repair program <ExternalLink className="w-5 h-5" aria-hidden="true" />
          <span className="sr-only">(opens the USDA website)</span>
        </a>
        <p className="text-[16px] text-muted leading-relaxed">
          The program is also called Section 504. It offers low-interest repair loans, and grants for homeowners 62 and older with very low income.
        </p>
      </div>
    </SubPage>
  );
}
