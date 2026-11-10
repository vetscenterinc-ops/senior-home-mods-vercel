"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { PageTitle } from "@/components/ui/PageTitle";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { btnSecondary } from "@/components/ui/SubPage";
import { Calendar, Camera, Lock, FileCheck2, MapPin, Video, Phone, ArrowRight, MessageCircle, House } from "lucide-react";
import { useJourney, PATHWAYS, canSubmitDocuments, fmtWhen, statusLabel } from "@/lib/journey";

const MODE_ICON = { video: Video, phone: Phone, in_person: MapPin, home: House } as const;

export default function HomePage() {
  const { journey, loading } = useJourney();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const path = journey.pathway ? PATHWAYS[journey.pathway] : null;
  const docsOpen = canSubmitDocuments(journey);
  const session = journey.session;

  // The one thing to do next
  let next: { label: string; title: string; text: string; href: string; button: string };
  if (!path) {
    next = {
      label: "TO DO NEXT",
      title: "Choose how to get started",
      text: "Meet with a housing counselor, take an online class, or go to an in-person event.",
      href: "/next-step",
      button: "See my options",
    };
  } else if (journey.status === "not_selected" && journey.pathway === "home_visit" && journey.requestedAt) {
    next = { label: "WE'RE ON IT", title: "We'll call you to set a time", text: "You asked for an in-home visit. Our team will call you soon.", href: "/home-visit", button: "See my request" };
  } else if (journey.status === "not_selected") {
    next = {
      label: "TO DO NEXT",
      title: path.action,
      text: `You chose: ${path.title}.`,
      href: path.href,
      button: journey.pathway === "home_visit" ? "Request my visit" : "Pick a time",
    };
  } else if (docsOpen) {
    next = { label: "TO DO NEXT", title: "Send your papers", text: "Your session is done and checked by our staff. You can send your papers now.", href: "/documents", button: "Send my papers" };
  } else if (journey.status === "needs_staff") {
    next = { label: "WE'RE ON IT", title: "Our staff will contact you", text: "Someone from our team will call you soon to help with your next step.", href: "/help", button: "Get help now" };
  } else if (journey.status === "completed") {
    next = { label: "ALMOST THERE", title: "Our staff is checking your session", text: "You'll be able to send your papers as soon as it's checked.", href: "/status", button: "See my progress" };
  } else {
    next = {
      label: "TO DO NEXT",
      title: journey.pathway === "class" ? "Finish your class" : journey.pathway === "home_visit" ? "Get ready for your home visit" : "Go to your session",
      text: session?.startsAt ? fmtWhen(session.startsAt) : "We'll send you a reminder.",
      href: "/appointments",
      button: "See the details",
    };
  }

  const ModeIcon = session?.mode ? MODE_ICON[session.mode] : Calendar;

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-5 pb-36 space-y-6">
        <header className="flex items-center justify-between gap-4">
          <Link href="/home"><Logo size="small" /></Link>
          <Link
            href="/profile"
            className="w-12 h-12 rounded-full bg-navy text-white font-bold text-[18px] flex items-center justify-center border-2 border-gold/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
            aria-label="My profile"
          >
            MJ
          </Link>
        </header>

        <div className="space-y-1">
          <PageTitle>{greeting}, Mary.</PageTitle>
          <p className="text-[17px] text-muted">Here&apos;s how your home project is going.</p>
        </div>

        {/* Next required action */}
        <section aria-labelledby="next-title" className="rounded-[22px] bg-navy p-6 space-y-4 shadow-[0_4px_20px_rgba(11,42,74,0.18)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[2px] bg-gold" aria-hidden="true" />
              <span className="text-gold-on-navy text-[14px] font-semibold tracking-[0.14em] uppercase font-[family-name:var(--font-montserrat)]">{next.label}</span>
            </div>
            <h2 id="next-title" className="font-[family-name:var(--font-fraunces)] font-semibold text-[24px] text-white leading-tight">{loading ? "Loading…" : next.title}</h2>
            <p className="text-[17px] text-cream-on-navy leading-relaxed">{next.text}</p>
          </div>
          <Link
            href={next.href}
            className="w-full min-h-[56px] rounded-[14px] bg-ivory text-navy font-bold text-[18px] flex items-center justify-center gap-2 hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
          >
            {next.button}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </section>

        {/* Selected pathway + scheduled session */}
        {path && (
          <section aria-labelledby="path-title" className="rounded-[22px] bg-white border border-hairline p-5 space-y-3 shadow-[0_4px_20px_rgba(60,40,10,0.07)]">
            <span className="text-[15px] font-bold text-gold-text">Your option</span>
            <h2 id="path-title" className="font-bold text-[19px] text-navy">{path.title}</h2>
            <p className="text-[17px] text-navy">
              Status: <strong>{statusLabel(journey)}</strong>
            </p>
            {session && (
              <div className="flex items-start gap-3 p-3 rounded-[14px] bg-sand">
                <ModeIcon className="w-5 h-5 text-navy shrink-0 mt-1" aria-hidden="true" />
                <div className="text-[17px] text-navy">
                  <div className="font-bold">{session.title}</div>
                  {session.startsAt && <div>{fmtWhen(session.startsAt)}</div>}
                  {session.location && <div className="text-muted">{session.location}</div>}
                </div>
              </div>
            )}
            <Link href="/next-step" className={btnSecondary}>Change My Option</Link>
          </section>
        )}

        {/* Document-submission availability */}
        <Link
          href="/documents"
          className="flex items-center gap-4 p-5 rounded-[22px] bg-white border border-hairline min-h-[72px] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${docsOpen ? "bg-leaf text-white" : "bg-sand text-navy"}`} aria-hidden="true">
            {docsOpen ? <FileCheck2 className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
          </div>
          <div>
            <div className="font-bold text-[18px] text-navy">Your papers</div>
            <div className={`text-[16px] ${docsOpen ? "text-leaf-text font-semibold" : "text-muted"}`}>
              {docsOpen ? "Open. You can send them now." : "Opens after your session or visit is checked by our staff"}
            </div>
          </div>
        </Link>

        {/* Optional photos */}
        <Link
          href="/photos"
          className="flex items-center gap-4 p-5 rounded-[22px] bg-white border border-hairline min-h-[72px] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
        >
          <div className="w-12 h-12 rounded-full bg-sand text-navy flex items-center justify-center shrink-0" aria-hidden="true">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-[18px] text-navy">Show us your home</div>
            <div className="text-[16px] text-muted">If you want: photos help your counselor get ready</div>
          </div>
        </Link>

        <Link href="/chat" className="flex items-center justify-center gap-2 min-h-[48px] text-[18px] font-bold text-navy underline decoration-gold underline-offset-4">
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          Have a question? Ask our helper
        </Link>
      </main>
      <BottomTabBar />
    </div>
  );
}
