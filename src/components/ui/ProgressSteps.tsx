"use client";

import React from "react";
import { Check } from "lucide-react";

export interface Step {
  id: string | number;
  label: string;
  description?: string;
}

export interface ProgressStepsProps {
  steps: Step[];
  currentStepIndex: number;
  className?: string;
}

export function ProgressSteps({
  steps,
  currentStepIndex,
  className = "",
}: ProgressStepsProps) {
  return (
    <nav aria-label="Application Progress" className={`w-full ${className}`}>
      <ol className="flex items-center justify-between gap-2 border-b border-[#DCE4F2] pb-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <li
              key={step.id}
              className="flex-1 flex flex-col items-center text-center relative"
              aria-current={isCurrent ? "step" : undefined}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`
                    w-11 h-11 rounded-full flex items-center justify-center text-[18px] font-bold border-2 transition-all
                    ${
                      isCompleted
                        ? "bg-[#2F5FD0] border-[#2F5FD0] text-white"
                        : isCurrent
                        ? "bg-white border-[#2F5FD0] text-[#2F5FD0] ring-4 ring-[#E3EBFB]"
                        : "bg-white border-[#CBD5E1] text-[#6B7280]"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[3]" aria-hidden="true" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                  <span className="sr-only">
                    {isCompleted ? "(Completed)" : isCurrent ? "(Current Step)" : "(Upcoming)"}
                  </span>
                </span>
              </div>
              <span
                className={`text-[16px] sm:text-[18px] leading-tight ${
                  isCurrent
                    ? "font-bold text-[#2F5FD0] underline decoration-2 underline-offset-4"
                    : isCompleted
                    ? "font-semibold text-[#111827]"
                    : "text-[#6B7280]"
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
