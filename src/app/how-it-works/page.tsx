"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Heart } from "lucide-react";

export default function HowItWorksPage() {
  const router = useRouter();

  const steps = [
    {
      num: "1",
      title: "Check your address",
      desc: "Free, and it takes about a minute. No account needed.",
    },
    {
      num: "2",
      title: "Tell us about the home",
      desc: "A few easy questions and documents. We help with every one.",
    },
    {
      num: "3",
      title: "We make the changes",
      desc: "A licensed contractor does the work. You follow each step here.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-4 pb-12 flex flex-col justify-between">
        <div className="space-y-6">
          <TopBar showBack={true} showCall={true} />

          <div className="space-y-3">
            <Eyebrow>HOW IT WORKS</Eyebrow>
            <PageTitle>Three simple steps to a safer home.</PageTitle>
          </div>

          {/* Connected numbered list */}
          <div className="space-y-6 pl-1 pt-2">
            {steps.map((step, idx) => (
              <div key={step.num} className="flex items-start gap-4 relative">
                {/* Vertical connecting line between numbers */}
                {idx < steps.length - 1 && (
                  <div
                    className="absolute left-[18px] top-[48px] bottom-[-24px] w-[2px] bg-sand-deep"
                    aria-hidden="true"
                  />
                )}

                {/* Large gold Fraunces number */}
                <div
                  className="font-[family-name:var(--font-fraunces)] font-semibold text-[44px] text-gold leading-none shrink-0 w-[36px] text-center"
                  aria-hidden="true"
                >
                  {step.num}
                </div>

                <div className="flex-1 pt-1 space-y-1">
                  <h2 className="text-[20px] font-bold text-navy leading-snug">
                    <span className="sr-only">Step {step.num}: </span>
                    {step.title}
                  </h2>
                  <p className="text-[17px] text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* "Who pays for it?" Card */}
          <Card className="mt-8">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full bg-sand text-navy flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <Heart className="w-5 h-5 stroke-[2] text-navy" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-[19px] font-bold text-navy">
                  Who pays for it?
                </h3>
                <p className="text-[16px] text-muted leading-relaxed">
                  Many homeowners in rural areas qualify for USDA home repair grants and low-interest loans for essential repairs like roofs, heating, and accessibility upgrades. We help you apply.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="space-y-4 pt-8">
          <PrimaryButton
            showArrow={true}
            onPress={() => router.push("/assistance-options")}
          >
            See my assistance options
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
