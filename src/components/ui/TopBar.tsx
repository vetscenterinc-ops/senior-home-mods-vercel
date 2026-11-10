"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone } from "lucide-react";

export interface TopBarProps {
  centerText?: string;
  showBack?: boolean;
  onBack?: () => void;
  showCall?: boolean;
  phoneNumber?: string;
  className?: string;
}

export function TopBar({
  centerText,
  showBack = true,
  onBack,
  showCall = true,
  phoneNumber = "(800) 555-0199",
  className = "",
}: TopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const rawTel = phoneNumber.replace(/[^0-9+]/g, "");

  return (
    <div
      className={`w-full flex items-center justify-between gap-4 py-3 min-h-[64px] ${className}`}
    >
      {/* Round 48px back button */}
      <div className="w-12 shrink-0">
        {showBack ? (
          <button
            type="button"
            onClick={handleBack}
            className="w-12 h-12 rounded-full bg-white border border-hairline text-navy flex items-center justify-center shadow-sm hover:bg-sand transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus focus-visible:ring-offset-2"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </button>
        ) : (
          <div className="w-12 h-12" aria-hidden="true" />
        )}
      </div>

      {/* Optional center text */}
      <div className="flex-1 text-center font-bold text-[17px] text-navy truncate">
        {centerText}
      </div>

      {/* Optional round 48px call button */}
      <div className="w-12 shrink-0 flex justify-end">
        {showCall ? (
          <a
            href={`tel:${rawTel}`}
            className="w-12 h-12 rounded-full bg-white border border-hairline text-navy flex items-center justify-center shadow-sm hover:bg-sand transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus focus-visible:ring-offset-2"
            aria-label={`Call us at ${phoneNumber}`}
          >
            <Phone className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </a>
        ) : (
          <div className="w-12 h-12" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
