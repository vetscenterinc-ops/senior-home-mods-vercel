"use client";

import React from "react";
import { SubPage } from "@/components/ui/SubPage";
import { Segmented } from "@/components/ui/Segmented";
import { useHomeMods, type TextSizeType } from "@/context/HomeModsContext";

export default function AccessibilityPage() {
  const { textSize, setTextSize } = useHomeMods();

  return (
    <SubPage eyebrow="RESOURCES & SUPPORT" title="Accessibility settings" intro="Make the app easier to see and use.">
      <section aria-labelledby="ts" className="rounded-[22px] bg-white border border-hairline p-5 space-y-3">
        <h2 id="ts" className="font-bold text-[19px] text-navy">Text size</h2>
        <Segmented
          label="Text size"
          options={[
            { value: "100", label: "A" },
            { value: "112", label: "A+" },
            { value: "125", label: "A++" },
          ]}
          value={textSize}
          onChange={(v) => setTextSize(v as TextSizeType)}
        />
        <p className="text-[17px] text-muted">This sentence shows the size you picked.</p>
      </section>

      <section aria-labelledby="tips" className="rounded-[22px] bg-white border border-hairline p-5 space-y-3">
        <h2 id="tips" className="font-bold text-[19px] text-navy">More help from your phone</h2>
        <ul className="list-disc pl-5 space-y-2 text-[17px] text-navy leading-relaxed">
          <li>To have the screen read aloud, turn on <strong>TalkBack</strong> on Android or <strong>VoiceOver</strong> on iPhone, in your phone&apos;s Settings under Accessibility.</li>
          <li>To make everything bigger, use your phone&apos;s <strong>Display size</strong> or <strong>Zoom</strong> setting.</li>
          <li>To talk to a person instead, call us any time from the Help page.</li>
        </ul>
      </section>
    </SubPage>
  );
}
