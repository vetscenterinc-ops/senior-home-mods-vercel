"use client";

import React from "react";
import { ClipboardList } from "lucide-react";
import { SubPage, EmptyState } from "@/components/ui/SubPage";

// Applications are created by staff after review. This list fills in once the backend is connected.
export default function ApplicationsPage() {
  return (
    <SubPage eyebrow="MY ASSISTANCE" title="My applications">
      <EmptyState
        icon={<ClipboardList className="w-7 h-7" />}
        title="No applications yet"
        text="After our staff reviews your papers, your counselor will help you prepare your application. You'll see it here, with its status."
      />
    </SubPage>
  );
}
