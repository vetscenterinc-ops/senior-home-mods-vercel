import React from "react";

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  label = "Step progress",
  className = "",
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`w-full h-[4px] bg-sand-deep rounded-full overflow-hidden ${className}`}
    >
      <div
        className="h-full bg-navy rounded-full transition-all duration-300 ease-out"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
