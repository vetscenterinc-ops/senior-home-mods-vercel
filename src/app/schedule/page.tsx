"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, CalendarX } from "lucide-react";
import { SubPage, EmptyState, btnPrimary } from "@/components/ui/SubPage";
import { Segmented } from "@/components/ui/Segmented";
import { useJourney, listPublished, fmtWhen, type MeetingMode, type MeetingSlot } from "@/lib/journey";

const MODE_LABEL: Record<MeetingMode, string> = { video: "Video", phone: "Phone", in_person: "In person", home: "Home visit" };
const MODE_NOTE: Record<MeetingMode, string> = {
  video: "We'll text and email you a link. Just tap it to join. No app needed.",
  phone: "Your counselor will call you at the phone number you gave us.",
  in_person: "Bring a photo ID. We'll make copies of any papers you bring and give the originals back.",
  home: "Our team member will call first and show a photo ID badge.",
};

export default function SchedulePage() {
  const router = useRouter();
  const { signUp } = useJourney();
  const [mode, setMode] = useState<MeetingMode>("video");
  const [slots, setSlots] = useState<MeetingSlot[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (t === "inperson" || t === "in_person") setMode("in_person");
    if (t === "phone") setMode("phone");
    listPublished<MeetingSlot>("availability").then((r) => setSlots(r.items));
  }, []);

  const shown = useMemo(() => (slots ?? []).filter((s) => !s.modes?.length || s.modes.includes(mode)), [slots, mode]);
  const chosen = shown.find((s) => s.id === selected);

  const book = async () => {
    if (!chosen) return;
    setSaving(true);
    const r = await signUp("meeting", {
      itemId: chosen.id,
      title: "Meeting with your HUD housing counselor",
      startsAt: chosen.startsAt,
      mode,
      location: mode === "in_person" ? chosen.location : undefined,
    });
    setSaving(false);
    if (r.ok) router.push("/home");
    else setMessage(r.message ?? "Something went wrong.");
  };

  return (
    <SubPage eyebrow="TALK WITH US" title="Meet with your HUD housing counselor." intro="It's free. How would you like to meet?" showTabs={false}>
      <Segmented
        label="How would you like to meet?"
        options={[
          { value: "video", label: "Video" },
          { value: "phone", label: "Phone" },
          { value: "in_person", label: "In person" },
        ]}
        value={mode}
        onChange={(v) => {
          setMode(v as MeetingMode);
          setSelected(null);
        }}
      />

      {slots === null ? (
        <p className="text-[17px] text-muted" role="status">Looking for open times…</p>
      ) : shown.length === 0 ? (
        <EmptyState
          icon={<CalendarX className="w-7 h-7" />}
          title="No open times are posted right now"
          text="Call us and we'll find a time that works for you, or ask our helper a question."
        />
      ) : (
        <div className="space-y-3">
          <h2 className="font-bold text-[18px] text-navy" id="times">Pick a time <span className="font-normal text-muted text-[16px]">(Central time)</span></h2>
          <div role="radiogroup" aria-labelledby="times" className="space-y-2">
            {shown.map((s) => {
              const on = s.id === selected;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setSelected(s.id)}
                  className={`w-full min-h-[60px] px-4 rounded-[14px] border-2 flex items-center gap-3 text-left text-[18px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus ${
                    on ? "bg-sand border-navy text-navy" : "bg-white border-hairline text-navy hover:border-control/60"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${on ? "border-navy bg-navy" : "border-control"}`} aria-hidden="true">
                    {on && <Check className="w-4 h-4 text-white stroke-[3]" />}
                  </span>
                  <span>
                    {fmtWhen(s.startsAt)}
                    {mode === "in_person" && s.location && <span className="block text-[16px] font-normal text-muted">{s.location}</span>}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-[16px] text-muted leading-relaxed">{MODE_NOTE[mode]}</p>
          {message && (
            <p role="alert" className="p-4 rounded-[14px] bg-sand border border-hairline text-[17px] text-navy">{message}</p>
          )}
          <button type="button" onClick={book} disabled={!chosen || saving} className={`${btnPrimary} disabled:opacity-50 disabled:cursor-not-allowed`}>
            {saving ? "Saving…" : chosen ? `Confirm ${MODE_LABEL[mode].toLowerCase()} meeting, ${fmtWhen(chosen.startsAt)}` : "Pick a time first"}
          </button>
        </div>
      )}
    </SubPage>
  );
}
