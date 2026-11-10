"use client";

import React from "react";
import { Button as AriaButton, ButtonProps as AriaButtonProps } from "react-aria-components";

export interface ButtonProps extends AriaButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "large";
  fullWidthOnMobile?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "default",
  fullWidthOnMobile = true,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-[12px] cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2F5FD0] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none";

  const sizeStyles =
    size === "large"
      ? "min-h-[56px] px-8 py-3.5 text-[20px]"
      : "min-h-[52px] px-6 py-3 text-[18px]";

  const widthStyles = fullWidthOnMobile ? "w-full sm:w-auto" : "";

  const variantStyles = {
    primary:
      "bg-[#2F5FD0] text-white hover:bg-[#244EB5] active:bg-[#1D3E92] shadow-sm hover:shadow",
    secondary:
      "bg-white text-[#2F5FD0] border-2 border-[#2F5FD0] hover:bg-[#EEF3FC] active:bg-[#E3EBFB]",
    outline:
      "bg-transparent text-[#2F5FD0] border-2 border-[#2F5FD0] hover:bg-[#EEF3FC] active:bg-[#E3EBFB]",
  }[variant];

  return (
    <AriaButton
      className={`${baseStyles} ${sizeStyles} ${widthStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </AriaButton>
  );
}
