"use client";

import React from "react";
import { Check } from "lucide-react";

export interface ChoiceCardProps {
  type?: "checkbox" | "radio";
  selected: boolean;
  onToggle: () => void;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  name?: string;
  className?: string;
}

export function ChoiceCard({
  type = "checkbox",
  selected,
  onToggle,
  label,
  sublabel,
  icon,
  className = "",
}: ChoiceCardProps) {
  const role = type === "radio" ? "radio" : "checkbox";

  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onToggle}
      className={`
        w-full p-4 sm:p-5 rounded-[18px] min-h-[72px] text-left transition-all cursor-pointer select-none
        flex items-center justify-between gap-4 bg-white
        focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus focus-visible:ring-offset-3
        ${
          selected
            ? "border-2 border-navy shadow-[0_2px_10px_rgba(11,42,74,0.08)]"
            : "border border-hairline hover:border-control/60 shadow-[0_2px_8px_rgba(60,40,10,0.04)]"
        }
        ${className}
      `}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {icon && (
          <div
            className="w-12 h-12 rounded-full bg-sand text-navy flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="text-[18px] font-bold text-navy leading-snug">
            {label}
          </div>
          {sublabel && (
            <div className="text-[15px] text-muted mt-0.5 leading-normal">
              {sublabel}
            </div>
          )}
        </div>
      </div>

      {/* Right check indicator */}
      <div
        className={`
          w-7 h-7 flex items-center justify-center shrink-0 transition-colors
          ${type === "radio" ? "rounded-full" : "rounded-[8px]"}
          ${
            selected
              ? "bg-navy border-2 border-navy text-white"
              : "bg-white border-2 border-control text-transparent"
          }
        `}
        aria-hidden="true"
      >
        {selected && <Check className="w-4 h-4 stroke-[3] text-white" />}
      </div>
      <span className="sr-only">
        {selected ? "Selected" : "Not selected"}
      </span>
    </button>
  );
}
