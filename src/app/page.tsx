"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextLink } from "@/components/ui/TextLink";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto flex flex-col min-h-screen bg-ivory shadow-lg relative">
        {/* Top 368px photo area */}
        <div className="relative w-full h-[368px] overflow-hidden bg-gradient-to-b from-[#dfb672] via-[#c4974f] to-[#91672c]">
          {/* Background image placeholder */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero.jpg')" }}
            role="img"
            aria-label="A real client smiling comfortably in their accessible, modified home"
          />

          {/* "How it works" pill button top-right */}
          <div className="absolute top-5 right-5 z-20">
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-white text-navy font-bold text-[16px] shadow-md hover:bg-sand transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus focus-visible:ring-offset-2"
            >
              How it works
            </Link>
          </div>

          {/* "Your photo: a real client at home" pill bottom-left */}
          <div className="absolute bottom-12 left-5 z-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/90 text-navy font-medium text-[15px] shadow-sm backdrop-blur-sm">
              Your photo: a real client at home
            </span>
          </div>
        </div>

        {/* Ivory sheet overlapping photo by 32px with 32px rounded top corners */}
        <div className="relative -mt-[32px] z-10 flex-1 bg-ivory rounded-t-[32px] pt-8 pb-10 px-6 sm:px-8 flex flex-col items-center text-center">
          {/* Full logo (112px tall) */}
          <div className="mb-4">
            <Logo size="large" />
          </div>

          {/* Headline & Description */}
          <div className="space-y-3 max-w-sm mb-8">
            <h1 className="font-[family-name:var(--font-fraunces)] font-semibold text-[34px] sm:text-[36px] leading-[1.12] tracking-tight text-navy">
              Stay in the home you love.
            </h1>
            <p className="text-[18px] sm:text-[19px] text-muted leading-relaxed">
              Roofing, heating, ramps, and safer bathrooms, with a real person guiding you the whole way.
            </p>
          </div>

          {/* Actions */}
          <div className="w-full space-y-4 max-w-sm">
            <PrimaryButton
              showArrow={true}
              onPress={() => router.push("/check")}
            >
              See if my home qualifies
            </PrimaryButton>

            <div>
              <TextLink href="/sign-in">
                I already have an account
              </TextLink>
            </div>

            <div className="pt-2 text-[17px] text-navy flex items-center justify-center gap-1.5 flex-wrap">
              <span>Talk to a person:</span>
              <a
                href="tel:8005550199"
                className="min-h-[48px] inline-flex items-center font-bold underline decoration-2 decoration-navy underline-offset-2 hover:text-navy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded px-1"
              >
                (800) 555-0199
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
