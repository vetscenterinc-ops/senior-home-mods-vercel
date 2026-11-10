"use client";

import React from "react";
import {
  RadioGroup as AriaRadioGroup,
  Radio as AriaRadio,
  Label as AriaLabel,
  Text as AriaText,
  RadioGroupProps as AriaRadioGroupProps,
} from "react-aria-components";
import { AlertCircle, Check } from "lucide-react";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, "children"> {
  label: string;
  description?: string;
  options: RadioOption[];
  errorMessage?: string;
}

export function RadioGroup({
  label,
  description,
  options,
  errorMessage,
  className = "",
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup className={`flex flex-col gap-3.5 w-full ${className}`} {...props}>
      <AriaLabel className="font-bold text-[22px] sm:text-[24px] text-[#111827]">
        {label}
      </AriaLabel>

      {description && (
        <AriaText slot="description" className="text-[18px] text-[#374151] leading-relaxed">
          {description}
        </AriaText>
      )}

      <div className="flex flex-col gap-3.5 mt-2" role="presentation">
        {options.map((opt) => (
          <AriaRadio
            key={opt.value}
            value={opt.value}
            className={({ isSelected, isFocusVisible }) => `
              relative flex items-center justify-between p-5 min-h-[64px] rounded-[16px] cursor-pointer transition-all
              ${
                isSelected
                  ? "border-2 border-[#2F5FD0] bg-[#F7FAFF] shadow-[0_2px_12px_rgba(47,95,208,0.12)]"
                  : "border border-[#DCE4F2] bg-white hover:border-[#2F5FD0] hover:bg-[#F9FAFC] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              }
              ${isFocusVisible ? "outline-none ring-4 ring-[#2F5FD0] ring-offset-2" : ""}
            `}
          >
            {({ isSelected }) => (
              <div className="flex items-center gap-4 w-full">
                {/* Line icon in light blue circle (#E3EBFB) with blue icon */}
                {opt.icon && (
                  <div
                    className="w-12 h-12 rounded-full bg-[#E3EBFB] text-[#2F5FD0] flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    {opt.icon}
                  </div>
                )}

                <div className="flex-1">
                  <div className="text-[20px] font-bold text-[#111827] leading-snug">
                    {opt.label}
                  </div>
                  {opt.description && (
                    <div className="text-[17px] text-[#374151] mt-1 font-normal leading-normal">
                      {opt.description}
                    </div>
                  )}
                </div>

                {/* Accessible radio state indicator */}
                <div
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? "border-[#2F5FD0] bg-[#2F5FD0] text-white" : "border-[#9CA3AF] bg-white"
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            )}
          </AriaRadio>
        ))}
      </div>

      {errorMessage && (
        <div aria-live="polite" className="text-[16px] font-bold text-[#B91C1C] flex items-center gap-2 mt-2">
          <AlertCircle className="w-5 h-5" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}
    </AriaRadioGroup>
  );
}
