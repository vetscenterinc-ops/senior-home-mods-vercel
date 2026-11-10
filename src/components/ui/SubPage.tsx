"use client";

import React from "react";
import Link from "next/link";
import { TopBar } from "@/components/ui/TopBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { Phone, MessageCircle } from "lucide-react";
import { SUPPORT_PHONE, SUPPORT_PHONE_TEL } from "@/lib/config";

const focus = "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus focus-visible:ring-offset-2";

export const btnPrimary = `w-full min-h-[56px] px-5 rounded-[14px] bg-navy text-white font-bold text-[18px] flex items-center justify-center gap-2 text-center hover:bg-navy-hover transition-colors cursor-pointer ${focus}`;
export const btnSecondary = `w-full min-h-[56px] px-5 rounded-[14px] bg-white border-2 border-navy text-navy font-bold text-[18px] flex items-center justify-center gap-2 text-center hover:bg-sand transition-colors cursor-pointer ${focus}`;

export function SubPage({
  eyebrow,
  title,
  intro,
  children,
  showTabs = true,
  showBack = true,
}: {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  showTabs?: boolean;
  showBack?: boolean;
}) {
  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main
        id="main-content"
        className={`w-full max-w-md mx-auto min-h-screen bg-ivory px-6 ${showBack ? "py-4" : "py-6"} ${showTabs ? "pb-36" : "pb-12"} space-y-6`}
      >
        {showBack && <TopBar showBack={true} showCall={false} />}
        <div className="space-y-2">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <PageTitle>{title}</PageTitle>
          {intro && <p className="text-[17px] text-muted leading-relaxed">{intro}</p>}
        </div>
        {children}
      </main>
      {showTabs && <BottomTabBar />}
    </div>
  );
}

/** Honest "nothing here yet" state with real ways to get help. */
export function EmptyState({
  icon,
  title,
  text,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-[22px] bg-white border border-hairline p-6 space-y-4 text-center shadow-[0_4px_20px_rgba(60,40,10,0.07)]">
      <div className="w-14 h-14 mx-auto rounded-full bg-sand text-navy flex items-center justify-center" aria-hidden="true">
        {icon}
      </div>
      <div className="space-y-1">
        <h2 className="font-bold text-[19px] text-navy">{title}</h2>
        <p className="text-[17px] text-muted leading-relaxed">{text}</p>
      </div>
      <div className="space-y-3">
        {children}
        <a href={`tel:${SUPPORT_PHONE_TEL}`} className={btnSecondary}>
          <Phone className="w-5 h-5" aria-hidden="true" />
          <span>Call us at <span className="whitespace-nowrap">{SUPPORT_PHONE}</span></span>
        </a>
        <Link href="/chat" className={btnSecondary}>
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          Ask our helper
        </Link>
      </div>
    </div>
  );
}
