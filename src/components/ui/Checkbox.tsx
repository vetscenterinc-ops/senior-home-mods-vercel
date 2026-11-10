"use client";

import React from "react";
import {
  Checkbox as AriaCheckbox,
  CheckboxProps as AriaCheckboxProps,
} from "react-aria-components";
import { Check } from "lucide-react";

export interface CheckboxProps extends AriaCheckboxProps {
  label: string;
  description?: string;
  className?: string;
}

export function Checkbox({
  label,
  description,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <AriaCheckbox
      className={`group flex items-start gap-3.5 min-h-[48px] py-2 cursor-pointer select-none ${className}`}
      {...props}
    >
      {({ isSelected, isFocusVisible }) => (
        <>
          <div
            className={`
              w-7 h-7 rounded-[8px] border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors
              ${
                isSelected
                  ? "bg-[#2F5FD0] border-[#2F5FD0] text-white"
                  : "bg-white border-[#9CA3AF] group-hover:border-[#2F5FD0]"
              }
              ${isFocusVisible ? "outline-none ring-4 ring-[#2F5FD0] ring-offset-2" : ""}
            `}
            aria-hidden="true"
          >
            {isSelected && <Check className="w-5 h-5 stroke-[3] text-white" />}
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-[#111827] leading-snug">
              {label}
            </span>
            {description && (
              <span className="text-[16px] text-[#374151] leading-normal mt-0.5">
                {description}
              </span>
            )}
          </div>
        </>
      )}
    </AriaCheckbox>
  );
}
