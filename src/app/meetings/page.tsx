"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { Button } from "@/components/ui/Button";
import { Calendar, ArrowLeft, Clock, MapPin } from "lucide-react";

export default function MeetingsPage() {
  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-6 sm:py-10 space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[#2F5FD0] font-bold text-[18px] underline min-h-[48px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2F5FD0] rounded p-1"
      >
        <ArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span>Back to Home</span>
      </Link>

      <div className="space-y-2">
        <h1 className="text-[28px] sm:text-[32px] font-extrabold text-[#111827]">
          Consultations & Meetings
        </h1>
        <p className="text-[18px] text-[#374151]">
          Schedule or review your home modification appointments.
        </p>
      </div>

      <Card variant="default" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#E3EBFB] text-[#2F5FD0] flex items-center justify-center shrink-0 border border-[#DCE4F2]">
              <Calendar className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-bold text-[20px] text-[#111827]">Home Safety Assessment</h2>
              <p className="text-[16px] text-[#4B5563]">In-Person Walkthrough</p>
            </div>
          </div>
          <StatusPill status="pending" customLabel="Ready to Schedule" />
        </div>

        <div className="p-4 rounded-[12px] bg-[#EEF3FC] border border-[#DCE4F2] space-y-2 text-[17px] text-[#374151]">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#2F5FD0]" aria-hidden="true" />
            <span>Duration: 45 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#2F5FD0]" aria-hidden="true" />
            <span>Location: Your Home</span>
          </div>
        </div>

        <Button variant="primary" size="large" fullWidthOnMobile={true}>
          Choose a Date & Time
        </Button>
      </Card>
    </div>
  );
}
