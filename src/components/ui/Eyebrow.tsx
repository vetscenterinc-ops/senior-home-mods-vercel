import React from "react";

export interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="w-[28px] h-[2px] bg-gold shrink-0" aria-hidden="true" />
      <span className="text-gold-text text-[15px] font-semibold tracking-[0.14em] uppercase font-[family-name:var(--font-montserrat)] leading-none">
        {children}
      </span>
    </div>
  );
}
