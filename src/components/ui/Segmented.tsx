"use client";

import React from "react";
import { Check } from "lucide-react";

export interface SegmentOption<T extends string = string> {
  value: T;
  label: string;
}

export interface SegmentedProps<T extends string = string> {
  label: string;
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function Segmented<T extends string = string>({
  label,
  options,
  value,
  onChange,
  className = "",
}: SegmentedProps<T>) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className="sr-only">{label}</span>
      <div
        role="radiogroup"
        aria-label={label}
        className="w-full p-1.5 bg-sand rounded-[24px] sm:rounded-full border border-hairline flex flex-wrap sm:flex-nowrap items-center gap-1.5"
      >
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(opt.value)}
              className={`
                flex-1 inline-flex items-center justify-center gap-1.5 h-[48px] min-h-[48px] px-3 rounded-full whitespace-nowrap
                text-[17px] font-bold tracking-tight transition-all cursor-pointer select-none
                focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus focus-visible:ring-offset-2
                ${
                  isSelected
                    ? "bg-navy text-white shadow-sm"
                    : "text-navy hover:text-navy-hover hover:bg-sand-deep/60"
                }
              `}
            >
              {isSelected && (
                <Check className="w-4 h-4 stroke-[3] text-white shrink-0" aria-hidden="true" />
              )}
              <span>{opt.label}</span>
              <span className="sr-only">{isSelected ? "(Selected)" : ""}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
