"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Video, GraduationCap, Users, House, Check, MessageCircle } from "lucide-react";
import { SubPage, btnPrimary } from "@/components/ui/SubPage";
import { useJourney, PATHWAYS, type PathwayType } from "@/lib/journey";

const OPTIONS: { type: PathwayType; icon: React.ElementType; title: string; text: string; button: string; detail: string }[] = [
  {
    type: "counselor",
    icon: Video,
    title: "Meet with a housing counselor",
    text: "Get one-on-one help with your home repair assistance options.",
    detail: "By video, phone, or in person.",
    button: "Schedule My Meeting",
  },
  {
    type: "class",
    icon: GraduationCap,
    title: "Take an online class",
    text: "Learn about the program and how to prepare your application.",
    detail: "Go at your own pace.",
    button: "View Available Classes",
  },
  {
    type: "event",
    icon: Users,
    title: "Attend an in-person event",
    text: "Join a local workshop and get help understanding the application process.",
    detail: "Meet our team and other homeowners.",
    button: "Find an Event Near Me",
  },
  {
    type: "home_visit",
    icon: House,
    title: "Request an in-home visit",
    text: "An authorized team member can visit your home, take photographs of repair concerns with your permission, and help collect the documents needed for your application.",
    detail: "Helpful if it's hard to get out.",
    button: "Request a Home Visit",
  },
];

export default function NextStepPage() {
  const router = useRouter();
  const { journey, choosePathway } = useJourney();

  const pick = async (type: PathwayType) => {
    await choosePathway(type);
    router.push(PATHWAYS[type].href);
  };

  return (
    <SubPage
      eyebrow="YOUR NEXT STEP"
      title="How would you like us to help you get started?"
      intro="Choose how you would like to receive help. You can explore free guidance without enrolling in optional paid application preparation."
    >
      <div className="space-y-4" role="list">
        {OPTIONS.map(({ type, icon: Icon, title, text, detail, button }) => {
          const current = journey.pathway === type;
          return (
            <section
              key={type}
              role="listitem"
              aria-labelledby={`opt-${type}`}
              className={`rounded-[22px] bg-white p-5 space-y-4 shadow-[0_4px_20px_rgba(60,40,10,0.07)] ${
                current ? "border-2 border-navy" : "border border-hairline"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-sand text-navy flex items-center justify-center shrink-0" aria-hidden="true">
                  <Icon className="w-7 h-7 stroke-[2]" />
                </div>
                <div className="space-y-1">
                  {current && (
                    <span className="inline-flex items-center gap-1 text-[15px] font-bold text-leaf-text">
                      <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" /> Your choice
                    </span>
                  )}
                  <h2 id={`opt-${type}`} className="font-[family-name:var(--font-fraunces)] font-semibold text-[21px] text-navy leading-snug">
                    {title}
                  </h2>
                  <p className="text-[17px] text-muted leading-relaxed">{text}</p>
                  <p className="text-[16px] text-navy font-semibold">{detail}</p>
                </div>
              </div>
              <button type="button" onClick={() => pick(type)} className={btnPrimary}>
                {button}
              </button>
            </section>
          );
        })}
      </div>

      <section className="rounded-[22px] border border-hairline bg-sand p-5 space-y-3">
        <h2 className="text-[19px] font-bold text-navy">Want additional application preparation?</h2>
        <p className="text-[16px] text-navy leading-relaxed">Optional guided application support is offered separately for a disclosed $150 fee, subject to applicable fee policies. You do not need to purchase it to explore assistance.</p>
        <Link href="/application-support/details" className="inline-flex min-h-[48px] items-center text-[17px] font-bold text-navy underline decoration-gold underline-offset-4">View optional service details</Link>
      </section>

      <Link
        href="/chat"
        className="flex items-center justify-center gap-2 min-h-[48px] text-[18px] font-bold text-navy underline decoration-gold underline-offset-4"
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        Not sure? Ask our helper
      </Link>
    </SubPage>
  );
}
