"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#DCE4F2] py-8 px-4 sm:px-6 pb-28 md:pb-8 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="text-[16px] text-[#4B5563]">
          <p className="font-bold text-[#111827] text-[18px] flex items-center justify-center md:justify-start gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2F5FD0]" aria-hidden="true" />
            Home Mods
          </p>
          <p className="mt-1">Helping seniors 62+ stay safe and independent at home.</p>
        </div>

        <nav aria-label="Footer Navigation">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/privacy"
                className="text-[17px] text-[#2F5FD0] underline font-bold hover:text-[#1D3E92] min-h-[48px] inline-flex items-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2F5FD0] rounded px-2"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
