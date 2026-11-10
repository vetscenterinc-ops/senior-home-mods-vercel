"use client";

import React from "react";
import Link from "next/link";
import { HandHeart, Video, MessageCircle, Phone } from "lucide-react";
import { SubPage, btnPrimary, btnSecondary } from "@/components/ui/SubPage";
import { SUPPORT_PHONE, SUPPORT_PHONE_TEL } from "@/lib/config";

export default function AssistancePage() {
  return (
    <SubPage
      eyebrow="MY ASSISTANCE"
      title="Find more assistance"
      intro="Your HUD housing counselor will help you find other programs that fit you, like help with repairs, energy bills, or benefits for veterans."
    >
      <div className="rounded-[22px] bg-white border border-hairline p-6 space-y-4 shadow-[0_4px_20px_rgba(60,40,10,0.07)]">
        <div className="w-14 h-14 rounded-full bg-sand text-navy flex items-center justify-center" aria-hidden="true">
          <HandHeart className="w-7 h-7" />
        </div>
        <p className="text-[18px] text-navy leading-relaxed">
          It&apos;s free. Your counselor looks at your situation and saves the programs that fit you in <strong>Saved Programs</strong>.
        </p>
        <Link href="/next-step" className={btnPrimary}>
          <Video className="w-5 h-5" aria-hidden="true" /> Meet with a counselor
        </Link>
        <a href={`tel:${SUPPORT_PHONE_TEL}`} className={btnSecondary}>
          <Phone className="w-5 h-5" aria-hidden="true" /> <span>Call us at <span className="whitespace-nowrap">{SUPPORT_PHONE}</span></span>
        </a>
        <Link href="/chat" className={btnSecondary}>
          <MessageCircle className="w-5 h-5" aria-hidden="true" /> Ask our helper
        </Link>
      </div>
    </SubPage>
  );
}
