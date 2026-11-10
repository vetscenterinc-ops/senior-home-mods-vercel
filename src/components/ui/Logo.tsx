import React from "react";

export interface LogoProps {
  size?: "default" | "large" | "small";
  className?: string;
  showText?: boolean;
}

export function Logo({
  size = "default",
  className = "",
  showText = true,
}: LogoProps) {
  const heights = {
    small: "h-[64px]",
    default: "h-[88px]",
    large: "h-[112px]",
  }[size];

  return (
    <div
      className={`inline-flex flex-col items-center justify-center text-center select-none ${className}`}
      aria-label="Senior Home Mods"
    >
      <span className="sr-only">Senior Home Mods</span>

      {/* Emblem SVG */}
      <svg
        viewBox="0 0 160 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heights} w-auto`}
        aria-hidden="true"
      >
        {/* Navy Arched House & Roofline */}
        <path
          d="M 28 82 L 28 58 L 80 20 L 132 58 L 132 82"
          stroke="#0b2a4a"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 80 12 C 46 12 18 40 18 80"
          stroke="#0b2a4a"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 80 12 C 114 12 142 40 142 80"
          stroke="#0b2a4a"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Warm Golden Window */}
        <rect
          x="72"
          y="38"
          width="16"
          height="16"
          rx="2"
          fill="#e6c77f"
          stroke="#0b2a4a"
          strokeWidth="3"
        />
        <line x1="80" y1="38" x2="80" y2="54" stroke="#0b2a4a" strokeWidth="2.5" />
        <line x1="72" y1="46" x2="88" y2="46" stroke="#0b2a4a" strokeWidth="2.5" />

        {/* Senior Couple Icon */}
        <circle cx="62" cy="54" r="5" fill="#0b2a4a" />
        <path
          d="M 54 78 C 54 67 60 63 67 63 C 71 63 74 65 76 68"
          stroke="#0b2a4a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="77" cy="57" r="4.5" fill="#0b2a4a" />
        <path
          d="M 70 78 C 70 69 74 66 82 66 C 88 66 92 70 92 78"
          stroke="#0b2a4a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Walking Cane */}
        <path d="M 53 68 L 51 82" stroke="#0b2a4a" strokeWidth="3" strokeLinecap="round" />

        {/* Accessible Gentle Ramp with Handrails */}
        <path
          d="M 86 82 L 138 72"
          stroke="#0b2a4a"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M 94 72 L 138 62"
          stroke="#0b2a4a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line x1="104" y1="70" x2="104" y2="79" stroke="#0b2a4a" strokeWidth="2.5" />
        <line x1="120" y1="66" x2="120" y2="76" stroke="#0b2a4a" strokeWidth="2.5" />

        {/* Green Leaf Accent */}
        <path
          d="M 32 60 C 24 50 16 58 24 72 C 30 68 34 62 32 60 Z"
          fill="#4f7a37"
        />
        <path
          d="M 38 68 C 30 62 26 70 34 80 C 40 76 40 70 38 68 Z"
          fill="#4f7a37"
        />
      </svg>

      {showText && (
        <div className="flex flex-col items-center mt-0.5 leading-none">
          {/* Wordmark: SENIOR in Cinzel 700 */}
          <span className="font-[family-name:var(--font-cinzel)] font-bold text-[24px] sm:text-[28px] tracking-[0.08em] text-navy leading-none">
            SENIOR
          </span>

          {/* Subtitle: HOME MODS in Montserrat 600, small caps */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-4 h-[1.5px] bg-gold" aria-hidden="true" />
            <span className="font-[family-name:var(--font-montserrat)] font-semibold text-[11px] sm:text-[12px] tracking-[0.24em] text-navy uppercase">
              HOME MODS
            </span>
            <span className="w-4 h-[1.5px] bg-gold" aria-hidden="true" />
          </div>
        </div>
      )}
    </div>
  );
}
