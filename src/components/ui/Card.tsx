"use client";

import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "sand" | "navy";
  className?: string;
}

export function Card({
  children,
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-white border border-hairline text-navy shadow-[0_4px_20px_rgba(60,40,10,0.07)]",
    sand: "bg-sand border border-hairline text-navy",
    navy: "bg-navy text-white shadow-[0_4px_20px_rgba(11,42,74,0.18)]",
  }[variant];

  return (
    <div
      className={`rounded-[22px] p-6 sm:p-7 ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
