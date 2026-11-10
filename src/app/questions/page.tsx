"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextLink } from "@/components/ui/TextLink";
import { Bath, Accessibility, Utensils, Bed, DoorOpen, Hammer, AirVent } from "lucide-react";

export default function QuestionsPage() {
  const router = useRouter();

  const [selectedRooms, setSelectedRooms] = useState<Record<string, boolean>>({
    roofing: false,
    hvac: false,
    bathroom: true,
    entrance: true,
    kitchen: false,
    bedroom: false,
    hallways: false,
  });

  const toggleRoom = (id: string) => {
    setSelectedRooms((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNext = () => {
    router.push("/about-you");
  };

  const rooms = [
    { id: "roofing", label: "Roof & exterior", sublabel: "Roof leaks, missing shingles, gutters", icon: <Hammer className="w-6 h-6 stroke-[2]" /> },
    { id: "hvac", label: "Heating & cooling (HVAC)", sublabel: "Furnace, heat pump, air conditioning", icon: <AirVent className="w-6 h-6 stroke-[2]" /> },
    { id: "bathroom", label: "Bathroom", sublabel: "Showers, bathtubs, grab bars", icon: <Bath className="w-6 h-6 stroke-[2]" /> },
    { id: "entrance", label: "Front steps or entrance", sublabel: "Ramps, non-slip treads, railings", icon: <Accessibility className="w-6 h-6 stroke-[2]" /> },
    { id: "kitchen", label: "Kitchen", sublabel: "Cabinets, stove access", icon: <Utensils className="w-6 h-6 stroke-[2]" /> },
    { id: "bedroom", label: "Bedroom", sublabel: "Bed height, pathway lighting", icon: <Bed className="w-6 h-6 stroke-[2]" /> },
    { id: "hallways", label: "Hallways and doorways", sublabel: "Thresholds, walker clearance", icon: <DoorOpen className="w-6 h-6 stroke-[2]" /> },
  ];

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-4 pb-12 flex flex-col justify-between">
        <div className="space-y-4">
          <TopBar centerText="Question 3 of 8" showBack={true} showCall={true} />

          {/* Progress: 3 of 8 = ~38% */}
          <ProgressBar value={38} label="Question 3 of 8" />

          <div className="space-y-2 pt-2">
            <Eyebrow>ABOUT THE HOME</Eyebrow>
            <PageTitle>Which areas need repairs or are hard to use?</PageTitle>
            <p className="text-[17px] text-muted">
              Choose all that apply.
            </p>
          </div>

          {/* Choice Cards */}
          <div className="space-y-3 pt-2">
            {rooms.map((room) => (
              <ChoiceCard
                key={room.id}
                type="checkbox"
                selected={Boolean(selectedRooms[room.id])}
                onToggle={() => toggleRoom(room.id)}
                label={room.label}
                sublabel={room.sublabel}
                icon={room.icon}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4 pt-8 text-center">
          <PrimaryButton onPress={handleNext}>
            Next
          </PrimaryButton>

          <div>
            <TextLink href="/about-you">
              Skip this question
            </TextLink>
          </div>
        </div>
      </main>
    </div>
  );
}
