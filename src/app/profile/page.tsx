"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHomeMods, TextSizeType } from "@/context/HomeModsContext";
import { Card } from "@/components/ui/Card";
import { Segmented } from "@/components/ui/Segmented";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { ChevronRight, PlusCircle, LogOut, User, Users, Bell } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { textSize, setTextSize } = useHomeMods();

  const handleSignOut = () => {
    router.push("/sign-in");
  };

  const rows = [
    {
      title: "Personal details",
      desc: "Name, birthday, phone",
      icon: User,
      href: "/about-you",
    },
    {
      title: "Family and caregivers",
      desc: "Lisa (daughter) can view",
      icon: Users,
      href: "#family",
    },
    {
      title: "Updates",
      desc: "Text and email",
      icon: Bell,
      href: "#updates",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-6 pb-36 space-y-6">
        {/* Profile Avatar & Header */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          {/* Large navy initials avatar with gold ring */}
          <div
            className="w-20 h-20 rounded-full bg-navy text-white font-bold text-[28px] flex items-center justify-center ring-4 ring-gold/50 shadow-md"
            aria-hidden="true"
          >
            MJ
          </div>

          <div className="space-y-0.5">
            <h1 className="font-[family-name:var(--font-fraunces)] font-semibold text-[28px] text-navy">
              Mary Johnson
            </h1>
            <p className="text-[15px] text-muted font-medium">
              Member since Oct 2026
            </p>
          </div>
        </div>

        {/* Card of Rows */}
        <Card className="p-2 divide-y divide-hairline">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <Link
                key={row.title}
                href={row.href}
                className="flex items-center gap-3.5 p-3.5 rounded-[14px] hover:bg-sand/40 transition-colors group focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
              >
                <div
                  className="w-10 h-10 rounded-full bg-sand text-navy flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[18px] text-navy">
                    {row.title}
                  </div>
                  <div className="text-[15px] text-muted">
                    {row.desc}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted group-hover:text-navy transition-colors shrink-0" aria-hidden="true" />
              </Link>
            );
          })}
        </Card>

        {/* Text Size Setting */}
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[18px] text-navy">Text size</span>
            <span className="text-[14px] text-muted font-semibold">Scale: {textSize}%</span>
          </div>

          <Segmented
            label="Root text size scale"
            options={[
              { value: "100", label: "A" },
              { value: "112", label: "A+" },
              { value: "125", label: "A++" },
            ]}
            value={textSize}
            onChange={(val) => setTextSize(val as TextSizeType)}
          />
        </Card>

        {/* Actions Card: Start New Request & Sign Out */}
        <Card className="p-2 divide-y divide-hairline">
          <Link
            href="/request"
            className="flex items-center gap-3.5 p-4 rounded-[14px] hover:bg-sand/40 transition-colors text-navy font-bold text-[17px] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
          >
            <PlusCircle className="w-5 h-5 text-gold shrink-0 stroke-[2.5]" aria-hidden="true" />
            <span className="flex-1">Start a new request</span>
            <ChevronRight className="w-5 h-5 text-muted shrink-0" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-3.5 p-4 rounded-[14px] hover:bg-sand/40 transition-colors text-navy font-bold text-[17px] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
          >
            <LogOut className="w-5 h-5 text-muted shrink-0 stroke-[2]" aria-hidden="true" />
            <span className="flex-1">Sign out</span>
            <ChevronRight className="w-5 h-5 text-muted shrink-0" aria-hidden="true" />
          </button>
        </Card>
      </main>

      <BottomTabBar />
    </div>
  );
}
