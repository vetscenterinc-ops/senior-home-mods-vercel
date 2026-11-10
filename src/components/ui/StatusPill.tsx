"use client";

import React from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

export type StatusType = "pending" | "approved" | "cancelled";

export interface StatusPillProps {
  status: StatusType;
  customLabel?: string;
  className?: string;
}

export function StatusPill({ status, customLabel, className = "" }: StatusPillProps) {
  const configs = {
    pending: {
      bg: "bg-[#FEF3C7]",
      text: "text-[#92400E]",
      border: "border-[#FDE68A]",
      defaultLabel: "Pending / Reviewing",
      Icon: Clock,
    },
    approved: {
      bg: "bg-[#DCFCE7]",
      text: "text-[#14532D]",
      border: "border-[#BBF7D0]",
      defaultLabel: "Approved / Completed",
      Icon: CheckCircle2,
    },
    cancelled: {
      bg: "bg-[#FEE2E2]",
      text: "text-[#991B1B]",
      border: "border-[#FECACA]",
      defaultLabel: "Cancelled",
      Icon: XCircle,
    },
  }[status];

  const Icon = configs.Icon;
  const label = customLabel || configs.defaultLabel;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[16px] font-bold border ${configs.bg} ${configs.text} ${configs.border} ${className}`}
    >
      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
