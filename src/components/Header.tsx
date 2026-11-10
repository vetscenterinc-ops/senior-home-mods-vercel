"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, MapPin, Calendar, User, Phone } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Documents", href: "/documents", icon: FileText },
    { name: "Check Address", href: "/#check-address", icon: MapPin },
    { name: "Meetings", href: "/meetings", icon: Calendar },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <header className="w-full bg-white border-b border-[#DCE4F2] sticky top-0 z-40">
      {/* Universal Help Line visible on every page */}
      <div className="bg-[#E3EBFB] text-[#1E3A8A] border-b border-[#DCE4F2] px-4 py-2 text-center text-[16px] sm:text-[17px] font-semibold flex items-center justify-center gap-2">
        <span>Need help?</span>
        <a
          href="tel:229225498"
          className="inline-flex items-center gap-1.5 font-bold text-[#2F5FD0] underline hover:text-[#1D3E92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5FD0] rounded px-1.5 py-1 min-h-[44px]"
          aria-label="Call helpline at 229225498"
        >
          <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Call 229225498</span>
        </a>
      </div>

      {/* Main Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo Placeholder */}
        <Link
          href="/"
          className="flex items-center gap-3 text-[#111827] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2F5FD0] rounded-lg p-1"
          aria-label="Home Mods homepage"
        >
          <div
            className="w-11 h-11 rounded-full bg-[#E3EBFB] text-[#2F5FD0] flex items-center justify-center font-bold shrink-0"
            aria-hidden="true"
          >
            <Home className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-[22px] sm:text-[24px] font-extrabold text-[#111827] leading-tight tracking-tight">
              Home Mods
            </span>
            <span className="text-[13px] text-[#4B5563] font-medium hidden sm:inline">
              Safe Living at Home
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`
                  inline-flex items-center gap-2 px-3.5 py-2.5 rounded-[10px] text-[17px] font-bold transition-all min-h-[48px]
                  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2F5FD0]
                  ${
                    isActive
                      ? "text-[#2F5FD0] bg-[#EEF3FC]"
                      : "text-[#374151] hover:text-[#2F5FD0] hover:bg-[#F8FAFC]"
                  }
                `}
              >
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Tap-to-call direct button */}
        <div className="flex items-center gap-3">
          <a
            href="tel:229225498"
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[48px] rounded-[10px] bg-white border-2 border-[#2F5FD0] text-[#2F5FD0] hover:bg-[#EEF3FC] font-bold text-[17px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2F5FD0] transition-colors"
            aria-label="Call 229225498"
          >
            <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Call:</span> 229225498
          </a>
        </div>
      </div>
    </header>
  );
}
