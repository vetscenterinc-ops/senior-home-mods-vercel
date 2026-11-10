"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  CalendarDays, GraduationCap, FileText, ClipboardList, Bookmark, HandHeart,
  Info, Landmark, LifeBuoy, Accessibility, User, ShieldCheck, LogOut, ChevronRight,
} from "lucide-react";
import { SubPage } from "@/components/ui/SubPage";
import { auth } from "@/lib/firebase";
import { isFirebaseConfigured } from "@/lib/config";

type Item = { label: string; href: string; icon: React.ElementType };

const SECTIONS: { title: string; items: Item[] }[] = [
  {
    title: "My Assistance",
    items: [
      { label: "Appointments", href: "/appointments", icon: CalendarDays },
      { label: "Classes & Workshops", href: "/classes", icon: GraduationCap },
      { label: "My Documents", href: "/documents", icon: FileText },
      { label: "My Applications", href: "/applications", icon: ClipboardList },
      { label: "Saved Programs", href: "/saved-programs", icon: Bookmark },
      { label: "Find More Assistance", href: "/assistance", icon: HandHeart },
    ],
  },
  {
    title: "Resources & Support",
    items: [
      { label: "Program Information", href: "/how-it-works", icon: Info },
      { label: "Find a Local Office", href: "/usda-office", icon: Landmark },
      { label: "Help & Support", href: "/help", icon: LifeBuoy },
      { label: "Accessibility Settings", href: "/accessibility", icon: Accessibility },
    ],
  },
  {
    title: "Account & Security",
    items: [
      { label: "My Profile", href: "/profile", icon: User },
      { label: "Privacy & Security", href: "/privacy", icon: ShieldCheck },
    ],
  },
];

const rowClass =
  "flex items-center gap-4 px-4 min-h-[64px] w-full text-left text-[18px] font-bold text-navy hover:bg-sand transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus focus-visible:ring-inset";

export default function MorePage() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      if (isFirebaseConfigured && auth) await signOut(auth);
    } finally {
      router.push("/");
    }
  };

  return (
    <SubPage title="More" showBack={false}>
      {SECTIONS.map((section) => (
        <section key={section.title} aria-labelledby={`sec-${section.title}`} className="space-y-2">
          <h2 id={`sec-${section.title}`} className="text-[15px] font-bold tracking-[0.12em] uppercase text-gold-text font-[family-name:var(--font-montserrat)]">
            {section.title}
          </h2>
          <ul className="rounded-[22px] bg-white border border-hairline divide-y divide-hairline overflow-hidden">
            {section.items.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className={rowClass}>
                  <Icon className="w-6 h-6 shrink-0" aria-hidden="true" />
                  <span className="flex-1">{label}</span>
                  <ChevronRight className="w-5 h-5 text-gold-text" aria-hidden="true" />
                </Link>
              </li>
            ))}
            {section.title === "Account & Security" && (
              <li>
                <button type="button" onClick={handleSignOut} className={`${rowClass} cursor-pointer`}>
                  <LogOut className="w-6 h-6 shrink-0" aria-hidden="true" />
                  <span className="flex-1">Sign Out</span>
                </button>
              </li>
            )}
          </ul>
        </section>
      ))}
    </SubPage>
  );
}
