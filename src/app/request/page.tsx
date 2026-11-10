"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import {
  Hammer,
  AirVent,
  Accessibility,
  TrendingUp,
  Bath,
  ArrowUpRight,
  DoorOpen,
  HelpCircle,
  Mic,
  MicOff,
  Check,
} from "lucide-react";

export default function NewRequestPage() {
  const router = useRouter();

  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    roofing: false,
    hvac: false,
    "grab-bars": true,
    ramp: true,
    shower: false,
    stair: false,
    doorway: false,
    other: false,
  });

  const [notes, setNotes] = useState("Front steps are slippery");
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSpeech = "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
      setSpeechSupported(Boolean(hasSpeech));
    }
  }, []);

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleVoiceTyping = () => {
    if (!speechSupported) return;

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const SpeechRecognition =
        (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any })
          .SpeechRecognition ||
        (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any })
          .webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setNotes((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const handleSend = () => {
    router.push("/status");
  };

  const modificationOptions = [
    { id: "roofing", label: "Roofing repair", icon: Hammer },
    { id: "hvac", label: "Heating & AC (HVAC)", icon: AirVent },
    { id: "grab-bars", label: "Grab bars", icon: Accessibility },
    { id: "ramp", label: "Ramp", icon: TrendingUp },
    { id: "shower", label: "Walk-in shower", icon: Bath },
    { id: "stair", label: "Stair railing", icon: ArrowUpRight },
    { id: "doorway", label: "Wider doorway", icon: DoorOpen },
    { id: "other", label: "Something else", icon: HelpCircle },
  ];

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-4 pb-12 flex flex-col justify-between">
        <div className="space-y-6">
          <TopBar showBack={true} showCall={false} />

          <div className="space-y-2">
            <Eyebrow>NEW REQUEST</Eyebrow>
            <PageTitle>What would you like help with?</PageTitle>
          </div>

          {/* 2-Column Grid of ChoiceCard Tiles */}
          <div className="grid grid-cols-2 gap-3">
            {modificationOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = Boolean(selectedItems[opt.id]);

              return (
                <button
                  key={opt.id}
                  type="button"
                  role="checkbox"
                  aria-checked={isSelected}
                  onClick={() => toggleItem(opt.id)}
                  className={`
                    p-4 rounded-[18px] min-h-[96px] text-left transition-all cursor-pointer flex flex-col justify-between
                    focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus
                    ${
                      isSelected
                        ? "bg-white border-2 border-navy shadow-[0_2px_12px_rgba(11,42,74,0.08)]"
                        : "bg-white border border-hairline hover:border-control/60 shadow-[0_2px_8px_rgba(60,40,10,0.04)]"
                    }
                  `}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className="w-10 h-10 rounded-full bg-sand text-navy flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>

                    <div
                      className={`
                        w-6 h-6 rounded-[6px] border-2 flex items-center justify-center transition-colors
                        ${
                          isSelected
                            ? "bg-navy border-navy text-white"
                            : "bg-white border-control text-transparent"
                        }
                      `}
                      aria-hidden="true"
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                    </div>
                  </div>

                  <span className="font-bold text-[17px] text-navy leading-snug mt-3">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Text Area with Mic button */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="request-notes" className="font-bold text-[18px] text-navy">
                Tell us more <span className="text-[16px] text-muted font-normal">(optional)</span>
              </label>

              {speechSupported && (
                <button
                  type="button"
                  onClick={handleVoiceTyping}
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[14px] font-bold border transition-colors
                    focus-visible:ring-3 focus-visible:ring-focus
                    ${
                      isRecording
                        ? "bg-focus text-white border-focus animate-pulse"
                        : "bg-sand text-navy border-hairline hover:bg-sand-deep"
                    }
                  `}
                >
                  {isRecording ? <MicOff className="w-4 h-4" aria-hidden="true" /> : <Mic className="w-4 h-4" aria-hidden="true" />}
                  <span>{isRecording ? "Listening..." : "Voice type"}</span>
                </button>
              )}
            </div>

            <textarea
              id="request-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe any roofing, heating, steps, doorways, or bathroom needs..."
              className="w-full p-4 text-[17px] text-navy bg-white border-2 border-control rounded-[14px] focus:border-navy focus:ring-4 focus:ring-gold/25 focus:outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Action */}
        <div className="pt-8">
          <PrimaryButton onPress={handleSend}>
            Send request
          </PrimaryButton>
        </div>
      </main>
    </div>
  );
}
