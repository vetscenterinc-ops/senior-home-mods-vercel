"use client";

import React from "react";
import Link from "next/link";

export interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function TextLink({
  href,
  children,
  className = "",
  onClick,
}: TextLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center min-h-[48px] px-1
        text-navy font-bold text-[18px] underline decoration-gold decoration-2 underline-offset-4
        hover:text-navy-hover transition-colors
        focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus focus-visible:ring-offset-2 rounded-[4px]
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
