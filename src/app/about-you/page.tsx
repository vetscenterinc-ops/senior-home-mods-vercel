"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { TextField } from "@/components/ui/TextField";
import { Chip } from "@/components/ui/Chip";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function AboutYouPage() {
  const router = useRouter();

  const [month, setMonth] = useState("March");
  const [day, setDay] = useState("14");
  const [year, setYear] = useState("1952");
  const [phone, setPhone] = useState("(770) 555-9142");

  const [usesWalker, setUsesWalker] = useState(true);
  const [wheelchair, setWheelchair] = useState(false);
  const [hardOfHearing, setHardOfHearing] = useState(true);
  const [lowVision, setLowVision] = useState(false);

  // Calculate age based on year
  const calculatedAge = 2026 - (parseInt(year, 10) || 1952);

  const handleSave = () => {
    router.push("/application-support");
  };

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-4 pb-12 flex flex-col justify-between">
        <div className="space-y-5">
          <TopBar centerText="Almost done" showBack={true} showCall={true} />

          <div className="space-y-2 pt-1">
            <Eyebrow>ABOUT YOU</Eyebrow>
            <PageTitle>A little about Mary.</PageTitle>
          </div>

          {/* Date of Birth Fieldset */}
          <fieldset className="space-y-2">
            <legend className="font-bold text-[18px] text-navy">
              Date of birth
            </legend>
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label htmlFor="dob-month" className="text-[14px] text-muted font-medium block mb-1">
                  Month
                </label>
                <input
                  id="dob-month"
                  type="text"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full h-[58px] min-h-[58px] px-3 text-[17px] text-navy bg-white border-2 border-control rounded-[14px] text-center focus:border-navy focus:ring-4 focus:ring-gold/25 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="dob-day" className="text-[14px] text-muted font-medium block mb-1">
                  Day
                </label>
                <input
                  id="dob-day"
                  type="text"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full h-[58px] min-h-[58px] px-3 text-[17px] text-navy bg-white border-2 border-control rounded-[14px] text-center focus:border-navy focus:ring-4 focus:ring-gold/25 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="dob-year" className="text-[14px] text-muted font-medium block mb-1">
                  Year
                </label>
                <input
                  id="dob-year"
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full h-[58px] min-h-[58px] px-3 text-[17px] text-navy bg-white border-2 border-control rounded-[14px] text-center focus:border-navy focus:ring-4 focus:ring-gold/25 focus:outline-none"
                />
              </div>
            </div>
            {/* Calculated age badge */}
            <div className="pt-1">
              <span className="inline-block px-3 py-1 rounded-full bg-sand text-navy font-bold text-[15px]">
                Age {calculatedAge > 0 ? calculatedAge : 74}
              </span>
            </div>
          </fieldset>

          {/* Best phone number */}
          <TextField
            label="Best phone number"
            value={phone}
            onChange={setPhone}
            placeholder="(000) 000-0000"
            type="tel"
          />

          {/* Assistance Needs */}
          <div className="space-y-2.5 pt-1">
            <span className="block font-bold text-[18px] text-navy">
              Anything that helps us help you?
            </span>
            <div className="flex flex-wrap gap-2.5">
              <Chip
                selected={usesWalker}
                onToggle={() => setUsesWalker(!usesWalker)}
              >
                Uses a walker
              </Chip>
              <Chip
                selected={wheelchair}
                onToggle={() => setWheelchair(!wheelchair)}
              >
                Wheelchair
              </Chip>
              <Chip
                selected={hardOfHearing}
                onToggle={() => setHardOfHearing(!hardOfHearing)}
              >
                Hard of hearing
              </Chip>
              <Chip
                selected={lowVision}
                onToggle={() => setLowVision(!lowVision)}
              >
                Low vision
              </Chip>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="pt-8">
          <PrimaryButton
            showArrow={true}
            onPress={handleSave}
          >
            Save and continue
          </PrimaryButton>
        </div>
      </main>
    </div>
  );
}
