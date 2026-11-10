"use client";

import React from "react";
import { Button as AriaButton, ButtonProps as AriaButtonProps } from "react-aria-components";

export interface SecondaryButtonProps extends AriaButtonProps {
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SecondaryButton({
  fullWidth = true,
  children,
  className = "",
  ...props
}: SecondaryButtonProps) {
  return (
    <AriaButton
      className={`
        inline-flex items-center justify-center gap-2.5 h-[56px] min-h-[56px] px-6 rounded-[16px]
        bg-white border-2 border-navy text-navy text-[18px] font-bold tracking-tight
        hover:bg-sand active:bg-sand-deep transition-all cursor-pointer select-none
        focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus focus-visible:ring-offset-3
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? "w-full" : "w-auto"}
        ${className}
      `}
      {...props}
    >
      {children}
    </AriaButton>
  );
}
