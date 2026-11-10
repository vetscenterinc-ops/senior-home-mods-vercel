"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListChecks, MessageCircle, Menu } from "lucide-react";

export interface TabItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function BottomTabBar({
  className = "",
  fixed = true,
}: {
  className?: string;
  fixed?: boolean;
}) {
  const pathname = usePathname();

  const tabs: TabItem[] = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Progress", href: "/status", icon: ListChecks },
    { name: "Messages", href: "/chat", icon: MessageCircle },
    { name: "More", href: "/more", icon: Menu },
  ];

  // Screens opened from the More menu keep "More" highlighted.
  const MORE_ROUTES = ["/more", "/appointments", "/classes", "/events", "/documents", "/applications", "/saved-programs", "/assistance", "/how-it-works", "/usda-office", "/help", "/accessibility", "/profile", "/privacy", "/photos", "/next-step", "/home-visit"];

  const positionClass = fixed ? "fixed bottom-0 left-0 right-0 z-40" : "relative w-full";

  return (
    <nav
      aria-label="App Navigation"
      className={`
        ${positionClass} bg-white border-t border-hairline
        h-[88px] min-h-[88px] px-4 flex items-center justify-around shadow-[0_-4px_20px_rgba(60,40,10,0.06)]
        ${className}
      `}
    >
      <div className="w-full max-w-md mx-auto flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.href === "/more" ? MORE_ROUTES.some((r) => pathname === r || pathname?.startsWith(r + "/")) : pathname === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`
                flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[56px] rounded-[12px]
                transition-colors cursor-pointer select-none
                focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus focus-visible:ring-offset-2
                ${isActive ? "text-navy font-bold" : "text-muted hover:text-navy font-medium"}
              `}
            >
              <div
                className={`
                  flex items-center justify-center px-4 py-1.5 rounded-full transition-colors
                  ${isActive ? "bg-sand text-navy" : "text-muted"}
                `}
                aria-hidden="true"
              >
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="text-[15px] tracking-tight leading-none">
                {tab.name}
              </span>
              <span className="sr-only">{isActive ? "(Current page)" : ""}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
