"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, MapPin, Calendar, User } from "lucide-react";

export function BottomNav({ onCheckAddressClick }: { onCheckAddressClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#DCE4F2] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 py-1.5"
    >
      <ul className="flex items-end justify-around relative">
        {/* 1. Home */}
        <li className="flex-1 flex justify-center">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`
              flex flex-col items-center justify-center min-h-[52px] min-w-[56px] py-1 px-1 rounded-lg text-center transition-colors
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2F5FD0]
              ${
                pathname === "/"
                  ? "text-[#2F5FD0] font-extrabold"
                  : "text-[#4B5563] hover:text-[#2F5FD0] font-semibold"
              }
            `}
          >
            <Home className="w-6 h-6" aria-hidden="true" />
            <span className="text-[13px] tracking-tight leading-tight mt-1">Home</span>
            {pathname === "/" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F5FD0] mt-0.5" aria-hidden="true" />
            )}
          </Link>
        </li>

        {/* 2. Documents */}
        <li className="flex-1 flex justify-center">
          <Link
            href="/documents"
            aria-current={pathname === "/documents" ? "page" : undefined}
            className={`
              flex flex-col items-center justify-center min-h-[52px] min-w-[56px] py-1 px-1 rounded-lg text-center transition-colors
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2F5FD0]
              ${
                pathname === "/documents"
                  ? "text-[#2F5FD0] font-extrabold"
                  : "text-[#4B5563] hover:text-[#2F5FD0] font-semibold"
              }
            `}
          >
            <FileText className="w-6 h-6" aria-hidden="true" />
            <span className="text-[13px] tracking-tight leading-tight mt-1">Documents</span>
            {pathname === "/documents" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F5FD0] mt-0.5" aria-hidden="true" />
            )}
          </Link>
        </li>

        {/* 3. Check Address (Large round blue center button) */}
        <li className="flex-1 flex justify-center">
          <button
            type="button"
            onClick={onCheckAddressClick}
            className="flex flex-col items-center -mt-6 group focus-visible:outline-none"
            aria-label="Check Address"
          >
            <div className="w-15 h-15 rounded-full bg-[#2F5FD0] text-white flex items-center justify-center shadow-lg border-4 border-white group-hover:bg-[#244EB5] group-focus-visible:ring-4 group-focus-visible:ring-[#2F5FD0] group-focus-visible:ring-offset-2 transition-transform active:scale-95">
              <MapPin className="w-7 h-7" aria-hidden="true" />
            </div>
            <span className="text-[12px] font-bold text-[#111827] mt-1 text-center whitespace-nowrap">
              Check Address
            </span>
          </button>
        </li>

        {/* 4. Meetings */}
        <li className="flex-1 flex justify-center">
          <Link
            href="/meetings"
            aria-current={pathname === "/meetings" ? "page" : undefined}
            className={`
              flex flex-col items-center justify-center min-h-[52px] min-w-[56px] py-1 px-1 rounded-lg text-center transition-colors
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2F5FD0]
              ${
                pathname === "/meetings"
                  ? "text-[#2F5FD0] font-extrabold"
                  : "text-[#4B5563] hover:text-[#2F5FD0] font-semibold"
              }
            `}
          >
            <Calendar className="w-6 h-6" aria-hidden="true" />
            <span className="text-[13px] tracking-tight leading-tight mt-1">Meetings</span>
            {pathname === "/meetings" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F5FD0] mt-0.5" aria-hidden="true" />
            )}
          </Link>
        </li>

        {/* 5. Profile */}
        <li className="flex-1 flex justify-center">
          <Link
            href="/profile"
            aria-current={pathname === "/profile" ? "page" : undefined}
            className={`
              flex flex-col items-center justify-center min-h-[52px] min-w-[56px] py-1 px-1 rounded-lg text-center transition-colors
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2F5FD0]
              ${
                pathname === "/profile"
                  ? "text-[#2F5FD0] font-extrabold"
                  : "text-[#4B5563] hover:text-[#2F5FD0] font-semibold"
              }
            `}
          >
            <User className="w-6 h-6" aria-hidden="true" />
            <span className="text-[13px] tracking-tight leading-tight mt-1">Profile</span>
            {pathname === "/profile" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F5FD0] mt-0.5" aria-hidden="true" />
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
