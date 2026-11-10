"use client";

import React, { useState } from "react";
import { useHomeMods, TextSizeType } from "@/context/HomeModsContext";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { TextLink } from "@/components/ui/TextLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { TextField } from "@/components/ui/TextField";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { Chip } from "@/components/ui/Chip";
import { Segmented } from "@/components/ui/Segmented";
import { Card } from "@/components/ui/Card";
import { TopBar } from "@/components/ui/TopBar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { Logo } from "@/components/ui/Logo";
import { Bath, Accessibility, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";

export default function StyleGuidePage() {
  const { textSize, setTextSize } = useHomeMods();

  // Component state examples for testing
  const [chipWalker, setChipWalker] = useState(true);
  const [chipWheelchair, setChipWheelchair] = useState(false);
  const [choiceBathroom, setChoiceBathroom] = useState(true);
  const [choiceEntrance, setChoiceEntrance] = useState(false);
  const [choiceMyself, setChoiceMyself] = useState("myself");
  const [segmentedValue, setSegmentedValue] = useState("pending");
  const [progressVal, setProgressVal] = useState(50);

  const colors = [
    { name: "ivory", hex: "#faf7f1", bg: "bg-ivory", border: "border-hairline", text: "text-navy" },
    { name: "sand", hex: "#f3ecdf", bg: "bg-sand", border: "border-hairline", text: "text-navy" },
    { name: "sand-deep", hex: "#ede4d3", bg: "bg-sand-deep", border: "border-hairline", text: "text-navy" },
    { name: "hairline", hex: "#e8e1d4", bg: "bg-hairline", border: "border-hairline", text: "text-navy" },
    { name: "navy", hex: "#0b2a4a", bg: "bg-navy", text: "text-white" },
    { name: "navy-hover", hex: "#173f6b", bg: "bg-navy-hover", text: "text-white" },
    { name: "muted", hex: "#50586a", bg: "bg-muted", text: "text-white" },
    { name: "control", hex: "#7d8696", bg: "bg-control", text: "text-navy" },
    { name: "gold", hex: "#b98a2e", bg: "bg-gold", text: "text-navy" },
    { name: "gold-text", hex: "#7a5a1e", bg: "bg-gold-text", text: "text-white" },
    { name: "gold-on-navy", hex: "#e6c77f", bg: "bg-gold-on-navy", text: "text-navy" },
    { name: "cream-on-navy", hex: "#f1e6cf", bg: "bg-cream-on-navy", text: "text-navy" },
    { name: "leaf", hex: "#4f7a37", bg: "bg-leaf", text: "text-white" },
    { name: "leaf-text", hex: "#3f6a2b", bg: "bg-leaf-text", text: "text-white" },
    { name: "focus", hex: "#b45309", bg: "bg-focus", text: "text-white" },
    { name: "white", hex: "#ffffff", bg: "bg-white", border: "border-hairline", text: "text-navy" },
  ];

  return (
    <main id="main-content" className="max-w-3xl mx-auto w-full px-4 py-8 pb-32 space-y-12 bg-ivory">
      {/* Top Bar Navigation */}
      <TopBar centerText="Design System & Style Guide" />

      {/* Intro */}
      <div className="space-y-3">
        <Eyebrow>DESIGN SYSTEM</Eyebrow>
        <PageTitle>Warm & Premium Style Guide</PageTitle>
        <p className="text-[18px] text-muted">
          WCAG 2.2 AA compliant tokens, typography, and shared accessible components for Senior Home Mods.
        </p>
      </div>

      {/* Global Text Size Controller */}
      <Card variant="sand" className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[18px] text-navy">Global Text Size Setting:</span>
          <span className="text-[15px] text-muted font-medium">Root Scale: {textSize}%</span>
        </div>
        <div className="flex items-center gap-2">
          {(["100", "112", "125"] as TextSizeType[]).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setTextSize(size)}
              className={`
                flex-1 h-[48px] rounded-full font-bold text-[17px] border-2 transition-all cursor-pointer
                focus-visible:ring-3 focus-visible:ring-focus
                ${
                  textSize === size
                    ? "bg-navy text-white border-navy shadow-sm"
                    : "bg-white text-navy border-control/30 hover:border-navy"
                }
              `}
            >
              {size === "100" ? "A (100%)" : size === "112" ? "A+ (112%)" : "A++ (125%)"}
            </button>
          ))}
        </div>
      </Card>

      {/* Colors Section */}
      <section className="space-y-4">
        <Eyebrow>COLOR TOKENS</Eyebrow>
        <h2 className="text-[26px] font-bold text-navy font-[family-name:var(--font-fraunces)]">
          Named Theme Tokens
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {colors.map((c) => (
            <div
              key={c.name}
              className="p-3 rounded-[16px] bg-white border border-hairline shadow-sm flex flex-col gap-2"
            >
              <div
                className={`w-full h-12 rounded-[10px] ${c.bg} ${c.border || "border border-hairline/40"}`}
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-navy">{c.name}</span>
                <span className="text-[13px] font-mono text-muted">{c.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Preview */}
      <section className="space-y-4">
        <Eyebrow>TYPOGRAPHY</Eyebrow>
        <h2 className="text-[26px] font-bold text-navy font-[family-name:var(--font-fraunces)]">
          Font Pairings
        </h2>
        <Card className="space-y-4">
          <div>
            <span className="text-[14px] font-mono text-muted uppercase">Headlines: Fraunces 600</span>
            <PageTitle className="mt-1">Stay in the home you love.</PageTitle>
          </div>
          <div className="border-t border-hairline pt-3">
            <span className="text-[14px] font-mono text-muted uppercase">Body & UI: Atkinson Hyperlegible 400 & 700</span>
            <p className="text-[18px] text-navy mt-1 leading-relaxed">
              Body text 18px minimum. Clear letterforms with exaggerated distinct shapes designed specifically for hyperlegibility and seniors.
            </p>
            <p className="text-[16px] text-muted mt-1">
              Helper text: 16px minimum, never drops below 15px anywhere.
            </p>
          </div>
          <div className="border-t border-hairline pt-3">
            <span className="text-[14px] font-mono text-muted uppercase">Eyebrows: Montserrat 600 (0.14em tracking)</span>
            <div className="mt-1">
              <Eyebrow>FREE ELIGIBILITY CHECK</Eyebrow>
            </div>
          </div>
          <div className="border-t border-hairline pt-3">
            <span className="text-[14px] font-mono text-muted uppercase">Logo Wordmark: Cinzel 700</span>
            <div className="mt-2">
              <Logo size="default" />
            </div>
          </div>
        </Card>
      </section>

      {/* Buttons & Links */}
      <section className="space-y-4">
        <Eyebrow>BUTTONS & ACTIONS</Eyebrow>
        <h2 className="text-[26px] font-bold text-navy font-[family-name:var(--font-fraunces)]">
          PrimaryButton, SecondaryButton & TextLink
        </h2>
        <Card className="space-y-5">
          <div className="space-y-2">
            <span className="text-[14px] font-mono text-muted uppercase">PrimaryButton (58px tall, 16px radius)</span>
            <div className="flex flex-col sm:flex-row gap-3">
              <PrimaryButton showArrow={true}>
                See if my home qualifies
              </PrimaryButton>
              <PrimaryButton fullWidth={false}>
                Simple Button
              </PrimaryButton>
            </div>
            <div className="pt-2">
              <PrimaryButton isDisabled={true}>
                Disabled Primary Button
              </PrimaryButton>
            </div>
          </div>

          <div className="border-t border-hairline pt-4 space-y-2">
            <span className="text-[14px] font-mono text-muted uppercase">SecondaryButton (56px tall, 2px navy border)</span>
            <div className="flex flex-col sm:flex-row gap-3">
              <SecondaryButton>
                Continue with Google
              </SecondaryButton>
              <SecondaryButton fullWidth={false} isDisabled={true}>
                Disabled Secondary
              </SecondaryButton>
            </div>
          </div>

          <div className="border-t border-hairline pt-4 space-y-2">
            <span className="text-[14px] font-mono text-muted uppercase">TextLink (48px tap area, gold underline)</span>
            <div className="flex flex-wrap gap-4 items-center">
              <TextLink href="#link-test">I already have an account</TextLink>
              <TextLink href="#password-test">Use a password instead</TextLink>
            </div>
          </div>
        </Card>
      </section>

      {/* Form Inputs: TextField */}
      <section className="space-y-4">
        <Eyebrow>FORM CONTROLS</Eyebrow>
        <h2 className="text-[26px] font-bold text-navy font-[family-name:var(--font-fraunces)]">
          TextField (58px input, 14px radius, gold focus glow)
        </h2>
        <Card className="space-y-4">
          <TextField
            label="Street address"
            hint="We'll see if it's in a USDA rural area. Takes a few seconds."
            placeholder="214 Oak Ridge Rd"
            defaultValue="214 Oak Ridge Rd"
          />

          <TextField
            label="Email or mobile number"
            placeholder="mary.johnson@email.com"
          />

          <TextField
            label="Input with Error Announcement"
            placeholder="Enter value"
            isInvalid={true}
            errorMessage="Please provide a valid 5-digit ZIP code."
          />

          <TextField
            label="Disabled Input"
            placeholder="Unavailable"
            isDisabled={true}
          />
        </Card>
      </section>

      {/* ChoiceCards & Chips */}
      <section className="space-y-4">
        <Eyebrow>SELECTION CONTROLS</Eyebrow>
        <h2 className="text-[26px] font-bold text-navy font-[family-name:var(--font-fraunces)]">
          ChoiceCard & Toggle Chips
        </h2>
        <Card className="space-y-6">
          <div className="space-y-3">
            <span className="text-[14px] font-mono text-muted uppercase">ChoiceCard (Multi-select checkbox style)</span>
            <div className="space-y-3">
              <ChoiceCard
                type="checkbox"
                selected={choiceBathroom}
                onToggle={() => setChoiceBathroom(!choiceBathroom)}
                label="Bathroom"
                sublabel="Showers, bathtubs, grab bars"
                icon={<Bath className="w-6 h-6 stroke-[2]" />}
              />
              <ChoiceCard
                type="checkbox"
                selected={choiceEntrance}
                onToggle={() => setChoiceEntrance(!choiceEntrance)}
                label="Front steps or entrance"
                sublabel="Ramps, non-slip treads, railings"
                icon={<Accessibility className="w-6 h-6 stroke-[2]" />}
              />
            </div>
          </div>

          <div className="border-t border-hairline pt-4 space-y-3">
            <span className="text-[14px] font-mono text-muted uppercase">ChoiceCard (Single-select radio style)</span>
            <div className="space-y-3">
              <ChoiceCard
                type="radio"
                selected={choiceMyself === "myself"}
                onToggle={() => setChoiceMyself("myself")}
                label="Myself"
                sublabel="I am looking for updates for my own home."
                icon={<ShieldCheck className="w-6 h-6 stroke-[2]" />}
              />
              <ChoiceCard
                type="radio"
                selected={choiceMyself === "caregiver"}
                onToggle={() => setChoiceMyself("caregiver")}
                label="Someone I care for"
                sublabel="I am helping a parent or relative."
                icon={<HeartHandshake className="w-6 h-6 stroke-[2]" />}
              />
            </div>
          </div>

          <div className="border-t border-hairline pt-4 space-y-3">
            <span className="text-[14px] font-mono text-muted uppercase">Chip Toggles (48px pills)</span>
            <div className="flex flex-wrap gap-2.5">
              <Chip
                selected={chipWalker}
                onToggle={() => setChipWalker(!chipWalker)}
              >
                Uses a walker
              </Chip>
              <Chip
                selected={chipWheelchair}
                onToggle={() => setChipWheelchair(!chipWheelchair)}
              >
                Wheelchair
              </Chip>
              <Chip
                selected={false}
                onToggle={() => {}}
              >
                Hard of hearing
              </Chip>
              <Chip
                selected={false}
                onToggle={() => {}}
              >
                Low vision
              </Chip>
            </div>
          </div>
        </Card>
      </section>

      {/* Segmented Control & Progress Bar */}
      <section className="space-y-4">
        <Eyebrow>FEEDBACK & NAVIGATION</Eyebrow>
        <h2 className="text-[26px] font-bold text-navy font-[family-name:var(--font-fraunces)]">
          Segmented, ProgressBar & TopBar
        </h2>
        <Card className="space-y-5">
          <div className="space-y-2">
            <span className="text-[14px] font-mono text-muted uppercase">Segmented Control (sand track, navy selected)</span>
            <Segmented
              label="Project Status Filter"
              options={[
                { value: "pending", label: "Reviewing" },
                { value: "completed", label: "Approved" },
                { value: "cancelled", label: "Cancelled" },
              ]}
              value={segmentedValue}
              onChange={setSegmentedValue}
            />
          </div>

          <div className="border-t border-hairline pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-mono text-muted uppercase">ProgressBar (4px tall, sand-deep track, navy fill)</span>
              <span className="text-[14px] font-bold text-navy">{progressVal}%</span>
            </div>
            <ProgressBar value={progressVal} />
            <div className="flex gap-2 pt-1 flex-wrap">
              {[25, 50, 75, 100].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setProgressVal(v)}
                  className="px-3 py-1 rounded bg-sand text-navy font-bold text-[14px] hover:bg-sand-deep cursor-pointer"
                >
                  Set {v}%
                </button>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Card Variants */}
      <section className="space-y-4">
        <Eyebrow>SURFACES</Eyebrow>
        <h2 className="text-[26px] font-bold text-navy font-[family-name:var(--font-fraunces)]">
          Card Surface Variants (22px radius, hairline border)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card variant="default">
            <h3 className="font-bold text-[18px]">Default Card</h3>
            <p className="text-[16px] text-muted mt-1">White surface with subtle warm shadow.</p>
          </Card>
          <Card variant="sand">
            <h3 className="font-bold text-[18px]">Sand Card</h3>
            <p className="text-[16px] text-muted mt-1">Soft warm fill for guidance or notes.</p>
          </Card>
          <Card variant="navy">
            <h3 className="font-bold text-[18px] text-white">Navy Card</h3>
            <p className="text-[16px] text-cream-on-navy mt-1">High-impact highlight card.</p>
          </Card>
        </div>
      </section>

      {/* BottomTabBar preview */}
      <section className="space-y-4">
        <Eyebrow>BOTTOM NAVIGATION</Eyebrow>
        <h2 className="text-[26px] font-bold text-navy font-[family-name:var(--font-fraunces)]">
          BottomTabBar (88px tall, white, active sand pill)
        </h2>
        <p className="text-[16px] text-muted">
          88px tall with Home, Documents, Status, and Profile items.
        </p>
        <div className="rounded-[22px] overflow-hidden border border-hairline shadow-sm">
          <BottomTabBar fixed={false} />
        </div>
      </section>
    </main>
  );
}
