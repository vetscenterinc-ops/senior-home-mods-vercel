"use client";

import React from "react";

export interface TabItem {
  id: string;
  label: string;
  badge?: number | string;
}

export interface SegmentedTabsProps {
  tabs: TabItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  ariaLabel?: string;
  className?: string;
}

export function SegmentedTabs({
  tabs,
  selectedId,
  onSelect,
  ariaLabel = "Filter options",
  className = "",
}: SegmentedTabsProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`inline-flex flex-wrap items-center p-1.5 bg-[#E3EBFB] border border-[#DCE4F2] rounded-full gap-1.5 ${className}`}
    >
      {tabs.map((tab) => {
        const isSelected = tab.id === selectedId;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelect(tab.id)}
            className={`
              min-h-[48px] px-5 py-2.5 rounded-full text-[17px] font-bold transition-all cursor-pointer flex items-center gap-2
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2F5FD0] focus-visible:ring-offset-2
              ${
                isSelected
                  ? "bg-[#2F5FD0] text-white shadow-sm"
                  : "text-[#1F2937] hover:text-[#2F5FD0] hover:bg-[#D5E3FA]"
              }
            `}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`text-[14px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? "bg-white text-[#2F5FD0]" : "bg-[#CBD5E1] text-[#111827]"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
