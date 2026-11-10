"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { MapPin, Lock } from "lucide-react";

export default function CheckAddressPage() {
  const router = useRouter();
  const [address, setAddress] = useState("214 Oak Ridge Rd");
  const [selectedIdx, setSelectedIdx] = useState(0);

  const suggestions = [
    { street: "214 Oak Ridge Rd", cityStateZip: "Locust Grove, GA 30248", eligible: true },
    { street: "214 Oak Ridge Rd", cityStateZip: "Hampton, GA 30228", eligible: false },
  ];

  const handleCheck = () => {
    const selected = suggestions[selectedIdx];
    if (selected && selected.eligible) {
      router.push("/check/eligible");
    } else {
      router.push("/check/not-eligible");
    }
  };

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-4 pb-12 flex flex-col justify-between">
        <div className="space-y-4">
          <TopBar centerText="Step 1 of 2" showBack={true} showCall={true} />

          {/* 50% Progress Bar */}
          <ProgressBar value={50} label="Step 1 of 2" />

          {/* Headings */}
          <div className="space-y-3 pt-2">
            <Eyebrow>FREE ELIGIBILITY CHECK</Eyebrow>
            <PageTitle>Where is the home?</PageTitle>
            <p className="text-[18px] text-muted leading-relaxed">
              We&apos;ll see if it&apos;s in a USDA rural area. It takes a few seconds, and you don&apos;t need an account.
            </p>
          </div>

          {/* Address Autocomplete input */}
          <div className="space-y-2 pt-2">
            <label
              htmlFor="address-input"
              className="block font-bold text-[18px] text-navy"
            >
              Street address
            </label>

            <input
              id="address-input"
              role="combobox"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your street address"
              className="w-full h-[58px] min-h-[58px] px-4 text-[18px] text-navy bg-white border-2 border-control rounded-[14px] focus:border-navy focus:ring-4 focus:ring-gold/25 focus:outline-none transition-all shadow-sm"
              aria-autocomplete="list"
              aria-controls="address-suggestions"
              aria-expanded="true"
            />

            {/* Suggestions Listbox */}
            <ul
              id="address-suggestions"
              role="listbox"
              aria-label="Address suggestions"
              className="mt-2 rounded-[16px] overflow-hidden border border-hairline shadow-[0_4px_16px_rgba(60,40,10,0.06)] bg-white divide-y divide-hairline"
            >
              {suggestions.map((item, idx) => {
                const isSelected = selectedIdx === idx;
                return (
                  <li
                    key={item.cityStateZip}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                    onClick={() => {
                      setSelectedIdx(idx);
                      setAddress(item.street);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedIdx(idx);
                        setAddress(item.street);
                      }
                    }}
                    className={`
                      p-4 flex items-start gap-3.5 cursor-pointer transition-colors select-none
                      focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus
                      ${isSelected ? "bg-sand" : "bg-white hover:bg-sand/40"}
                    `}
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-navy flex items-center justify-center shrink-0 border border-hairline mt-0.5">
                      <MapPin className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[18px] text-navy leading-tight">
                        {item.street}
                      </div>
                      <div className="text-[16px] text-muted mt-0.5">
                        {item.cityStateZip}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Privacy note */}
            <div className="flex items-center gap-2 pt-2 text-muted text-[16px]">
              <Lock className="w-4 h-4 text-gold shrink-0 stroke-[2]" aria-hidden="true" />
              <span>Private. We only use it to check eligibility.</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="space-y-4 pt-8">
          <PrimaryButton onPress={handleCheck}>
            Check my address
          </PrimaryButton>

          <div className="text-center text-[17px] text-navy">
            <span>Prefer to talk? </span>
            <a
              href="tel:8005550199"
              className="font-bold underline decoration-2 decoration-navy underline-offset-2 hover:text-navy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded px-1"
            >
              Call (800) 555-0199
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
