"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { Card } from "@/components/ui/Card";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextLink } from "@/components/ui/TextLink";
import { Check, MapPin } from "lucide-react";

export default function EligiblePage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-4 pb-12 flex flex-col justify-between">
        <div className="space-y-6">
          <TopBar showBack={true} showCall={false} />

          {/* Large white circle holding a leaf-green check */}
          <div className="flex flex-col items-center text-center space-y-4 pt-4">
            <div
              className="w-20 h-20 rounded-full bg-white border border-hairline shadow-[0_4px_16px_rgba(60,40,10,0.08)] flex items-center justify-center text-leaf"
              aria-hidden="true"
            >
              <div className="w-14 h-14 rounded-full bg-leaf text-white flex items-center justify-center">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
            </div>

            <Eyebrow className="justify-center">GOOD NEWS</Eyebrow>

            <PageTitle className="text-center">
              Your home is in an eligible area.
            </PageTitle>
          </div>

          {/* Address Card */}
          <Card className="flex items-center gap-3.5 p-5">
            <div
              className="w-10 h-10 rounded-full bg-sand text-navy flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <MapPin className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-bold text-[18px] text-navy">
                214 Oak Ridge Rd
              </div>
              <div className="text-[16px] text-muted">
                Locust Grove, GA 30248
              </div>
            </div>
          </Card>

          {/* Info note */}
          <p className="text-[16px] text-muted text-center leading-relaxed px-2">
            This isn&apos;t final approval yet. Next we&apos;ll ask a few questions about you and the home. It takes about 5 minutes.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4 pt-8 text-center">
          <PrimaryButton
            showArrow={true}
            onPress={() => router.push("/account")}
          >
            Continue
          </PrimaryButton>

          <div>
            <TextLink href="/check">
              Check a different address
            </TextLink>
          </div>
        </div>
      </main>
    </div>
  );
}
