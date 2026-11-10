"use client";

import React from "react";
import { Button as AriaButton, ButtonProps as AriaButtonProps } from "react-aria-components";
import { ArrowRight } from "lucide-react";

export interface PrimaryButtonProps extends AriaButtonProps {
  showArrow?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function PrimaryButton({
  showArrow = false,
  fullWidth = true,
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <AriaButton
      className={`
        inline-flex items-center justify-center gap-2.5 h-[58px] min-h-[58px] px-7 rounded-[16px]
        bg-navy text-white text-[18px] font-bold tracking-tight shadow-[0_4px_14px_rgba(11,42,74,0.18)]
        hover:bg-navy-hover active:bg-navy transition-all cursor-pointer select-none
        focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus focus-visible:ring-offset-3
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
        ${fullWidth ? "w-full" : "w-auto"}
        ${className}
      `}
      {...props}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-5 h-5 text-gold-on-navy shrink-0 stroke-[2.5]" aria-hidden="true" />
      )}
    </AriaButton>
  );
}
