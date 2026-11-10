"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextLink } from "@/components/ui/TextLink";
import { Bath, Accessibility, Utensils, Bed, DoorOpen, Hammer, Camera, Check, ShieldCheck } from "lucide-react";

// Rooms the person tapped in the questionnaire show first. (Static sample for now.)
const ROOMS = [
  { id: "bathroom", label: "Bathroom", icon: Bath },
  { id: "entrance", label: "Front steps", icon: Accessibility },
  { id: "kitchen", label: "Kitchen", icon: Utensils },
  { id: "bedroom", label: "Bedroom", icon: Bed },
  { id: "hallways", label: "Hallways and doors", icon: DoorOpen },
  { id: "roofing", label: "Roof or outside", icon: Hammer },
];

export default function PhotosPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [message, setMessage] = useState<string | null>(null);

  const takePhoto = (roomId: string) => {
    setActiveRoom(roomId);
    inputRef.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = e.target.files?.length ?? 0;
    if (n && activeRoom) {
      setCounts((c) => ({ ...c, [activeRoom]: (c[activeRoom] ?? 0) + n }));
      const label = ROOMS.find((r) => r.id === activeRoom)?.label;
      setMessage(`Photo added: ${label}`);
      setTimeout(() => setMessage(null), 4000);
    }
    e.target.value = "";
  };

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-4 pb-12 flex flex-col justify-between">
        <div className="space-y-5">
          <TopBar showBack={true} showCall={true} />

          <div className="space-y-2">
            <Eyebrow>IF YOU WANT</Eyebrow>
            <PageTitle>Show us your home</PageTitle>
            <p className="text-[17px] text-muted leading-relaxed">
              Take a few photos of the places that are hard to use. It helps your counselor get ready.
            </p>
          </div>

          <div className="p-4 rounded-[16px] bg-sand border border-hairline flex items-center gap-3 text-[16px] text-navy">
            <ShieldCheck className="w-6 h-6 text-leaf-text shrink-0 stroke-[2]" aria-hidden="true" />
            <span>Safe and private. Only your counselor and our team can see them.</span>
          </div>

          {message && (
            <div role="status" aria-live="polite" className="p-3.5 rounded-[14px] bg-leaf/10 border border-leaf text-leaf-text font-bold text-[16px] flex items-center gap-2">
              <Check className="w-5 h-5 stroke-[3]" aria-hidden="true" />
              <span>{message}</span>
            </div>
          )}

          <input ref={inputRef} type="file" accept="image/*" capture="environment" multiple className="hidden" aria-label="Take a photo" onChange={handleFile} />

          <ul className="space-y-3">
            {ROOMS.map((room) => {
              const Icon = room.icon;
              const count = counts[room.id] ?? 0;
              return (
                <li key={room.id} className="p-4 rounded-[18px] bg-white border border-hairline flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sand text-navy flex items-center justify-center shrink-0" aria-hidden="true">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[18px] text-navy">{room.label}</div>
                    <div className={`text-[16px] ${count ? "text-leaf-text font-semibold" : "text-muted"}`}>
                      {count ? `${count} photo${count > 1 ? "s" : ""} added` : "No photos yet"}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => takePhoto(room.id)}
                    className="h-[48px] px-4 rounded-full border-2 border-navy bg-white text-navy font-bold text-[16px] inline-flex items-center gap-1.5 hover:bg-sand transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
                    aria-label={`Take a photo of the ${room.label.toLowerCase()}`}
                  >
                    <Camera className="w-4 h-4" aria-hidden="true" />
                    Photo
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="space-y-3 pt-8 text-center">
          <PrimaryButton onPress={() => router.push("/home")}>I&apos;m done</PrimaryButton>
          <TextLink href="/home">Skip for now</TextLink>
        </div>
      </main>
    </div>
  );
}
