"use client";

import React from "react";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({
  variant = "info",
  title,
  children,
  className = "",
}: AlertProps) {
  const configs = {
    info: {
      border: "border-[#2F5FD0]",
      bg: "bg-[#F0F5FF]",
      text: "text-[#1E3A8A]",
      iconBg: "bg-[#E3EBFB]",
      iconColor: "text-[#2F5FD0]",
      Icon: Info,
      label: "Information",
    },
    success: {
      border: "border-[#16A34A]",
      bg: "bg-[#DCFCE7]",
      text: "text-[#14532D]",
      iconBg: "bg-[#BBF7D0]",
      iconColor: "text-[#15803D]",
      Icon: CheckCircle2,
      label: "Success",
    },
    warning: {
      border: "border-[#D97706]",
      bg: "bg-[#FEF3C7]",
      text: "text-[#92400E]",
      iconBg: "bg-[#FDE68A]",
      iconColor: "text-[#B45309]",
      Icon: AlertTriangle,
      label: "Warning",
    },
    error: {
      border: "border-[#DC2626]",
      bg: "bg-[#FEE2E2]",
      text: "text-[#991B1B]",
      iconBg: "bg-[#FECACA]",
      iconColor: "text-[#B91C1C]",
      Icon: XCircle,
      label: "Error",
    },
  }[variant];

  const IconComponent = configs.Icon;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`p-4 sm:p-5 rounded-[16px] border-2 ${configs.border} ${configs.bg} ${configs.text} flex items-start gap-4 shadow-sm ${className}`}
    >
      <div
        className={`w-10 h-10 rounded-full ${configs.iconBg} ${configs.iconColor} flex items-center justify-center shrink-0 mt-0.5`}
        aria-hidden="true"
      >
        <IconComponent className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <span className="sr-only">{configs.label}: </span>
        {title && (
          <h4 className="font-bold text-[19px] leading-snug mb-1 text-inherit">
            {title}
          </h4>
        )}
        <div className="text-[18px] leading-relaxed text-inherit">
          {children}
        </div>
      </div>
    </div>
  );
}
