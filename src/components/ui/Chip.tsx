"use client";

import React from "react";
import { Check } from "lucide-react";

export interface ChipProps {
  selected: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Chip({
  selected,
  onToggle,
  children,
  className = "",
}: ChipProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={selected}
      onClick={onToggle}
      className={`
        inline-flex items-center justify-center gap-2 h-[48px] min-h-[48px] px-5 rounded-full
        text-[17px] font-bold tracking-tight transition-all cursor-pointer select-none
        focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus focus-visible:ring-offset-2
        ${
          selected
            ? "bg-navy text-white border-2 border-navy shadow-sm"
            : "bg-white text-navy border-2 border-control/40 hover:border-navy hover:bg-sand/40"
        }
        ${className}
      `}
    >
      {selected && <Check className="w-4 h-4 stroke-[3] text-white shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      <span className="sr-only">{selected ? "On" : "Off"}</span>
    </button>
  );
}
