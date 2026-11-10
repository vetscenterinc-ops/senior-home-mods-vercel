"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useHomeMods, RecipientType } from "@/context/HomeModsContext";
import { TopBar } from "@/components/ui/TopBar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PageTitle } from "@/components/ui/PageTitle";
import { Segmented } from "@/components/ui/Segmented";
import { TextField } from "@/components/ui/TextField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextLink } from "@/components/ui/TextLink";
import { Check } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { recipient, setRecipient } = useHomeMods();

  const [recipientChoice, setRecipientChoice] = useState<string>(
    recipient === "someone_else" ? "someone_else" : "myself"
  );
  const [fullName, setFullName] = useState("Mary Johnson");
  const [contact, setContact] = useState("mary.johnson@email.com");
  const [smsOptIn, setSmsOptIn] = useState(true);

  const handleRecipientChange = (val: string) => {
    setRecipientChoice(val);
    setRecipient(val as RecipientType);
  };

  const handleCreateAccount = () => {
    router.push("/questions");
  };

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-4 pb-12 flex flex-col justify-between">
        <div className="space-y-5">
          <TopBar centerText="Step 2 of 2" showBack={true} showCall={true} />

          {/* 100% Progress Bar */}
          <ProgressBar value={100} label="Step 2 of 2" />

          {/* Title & Subtitle */}
          <div className="space-y-1.5 pt-2">
            <PageTitle>Save your progress.</PageTitle>
            <p className="text-[18px] text-muted">
              So you never have to start over.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5 pt-2">
            {/* Segmented control for "Who is this for?" */}
            <div className="space-y-2">
              <label className="block font-bold text-[18px] text-navy">
                Who is this for?
              </label>
              <Segmented
                label="Recipient selection"
                options={[
                  { value: "myself", label: "Myself" },
                  { value: "someone_else", label: "Someone I care for" },
                ]}
                value={recipientChoice}
                onChange={handleRecipientChange}
              />
            </div>

            <TextField
              label="Your full name"
              value={fullName}
              onChange={setFullName}
              placeholder="Full name"
            />

            <TextField
              label="Email or mobile number"
              value={contact}
              onChange={setContact}
              placeholder="name@email.com"
            />

            {/* Checkbox: "Text me when something changes" */}
            <button
              type="button"
              role="checkbox"
              aria-checked={smsOptIn}
              onClick={() => setSmsOptIn(!smsOptIn)}
              className="flex items-center gap-3.5 min-h-[48px] py-1 text-left cursor-pointer select-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus rounded-[8px]"
            >
              <div
                className={`
                  w-7 h-7 rounded-[8px] border-2 flex items-center justify-center shrink-0 transition-colors
                  ${smsOptIn ? "bg-navy border-navy text-white" : "bg-white border-control"}
                `}
                aria-hidden="true"
              >
                {smsOptIn && <Check className="w-5 h-5 stroke-[3] text-white" />}
              </div>
              <span className="text-[17px] font-semibold text-navy leading-snug">
                Text me when something changes
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-4 pt-8 text-center">
          <PrimaryButton
            showArrow={true}
            onPress={handleCreateAccount}
          >
            Create my account
          </PrimaryButton>

          <div className="text-[17px] text-navy">
            <span>Already have one? </span>
            <TextLink href="/sign-in">
              Sign in
            </TextLink>
          </div>
        </div>
      </main>
    </div>
  );
}
