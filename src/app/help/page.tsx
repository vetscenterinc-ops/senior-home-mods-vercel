"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, Info, UserRound } from "lucide-react";
import { SubPage, btnPrimary, btnSecondary } from "@/components/ui/SubPage";
import { useJourney } from "@/lib/journey";
import { SUPPORT_PHONE, SUPPORT_PHONE_TEL } from "@/lib/config";

export default function HelpPage() {
  const { journey, askForStaffHelp } = useJourney();
  const asked = journey.status === "needs_staff";

  return (
    <SubPage eyebrow="RESOURCES & SUPPORT" title="Help & support" intro="We're here for you. Pick the way that's easiest.">
      <div className="space-y-3">
        <a href={`tel:${SUPPORT_PHONE_TEL}`} className={btnPrimary}>
          <Phone className="w-5 h-5" aria-hidden="true" /> <span>Call us at <span className="whitespace-nowrap">{SUPPORT_PHONE}</span></span>
        </a>
        <Link href="/chat" className={btnSecondary}>
          <MessageCircle className="w-5 h-5" aria-hidden="true" /> Ask our helper
        </Link>
        <button type="button" onClick={askForStaffHelp} disabled={asked} className={`${btnSecondary} disabled:opacity-60 disabled:cursor-default`}>
          <UserRound className="w-5 h-5" aria-hidden="true" /> {asked ? "We'll contact you" : "Ask staff to contact me"}
        </button>
        <Link href="/how-it-works" className={btnSecondary}>
          <Info className="w-5 h-5" aria-hidden="true" /> How the program works
        </Link>
      </div>
      {asked && (
        <p role="status" className="p-4 rounded-[14px] bg-sand border border-hairline text-[17px] text-navy">
          Got it. Someone from our team will reach out to help you.
        </p>
      )}
    </SubPage>
  );
}
