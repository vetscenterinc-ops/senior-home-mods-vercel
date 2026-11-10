"use client";

import React from "react";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { SubPage, EmptyState, btnPrimary } from "@/components/ui/SubPage";

// Programs are saved here by the counselor for this homeowner (backend phase).
export default function SavedProgramsPage() {
  return (
    <SubPage eyebrow="MY ASSISTANCE" title="Saved programs">
      <EmptyState
        icon={<Bookmark className="w-7 h-7" />}
        title="No saved programs yet"
        text="When your HUD housing counselor finds programs that fit you, they'll save them here so you can come back to them."
      >
        <Link href="/next-step" className={btnPrimary}>Meet with a counselor</Link>
      </EmptyState>
    </SubPage>
  );
}
