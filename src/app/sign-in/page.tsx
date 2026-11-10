"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/ui/TopBar";
import { Logo } from "@/components/ui/Logo";
import { PageTitle } from "@/components/ui/PageTitle";
import { TextField } from "@/components/ui/TextField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { TextLink } from "@/components/ui/TextLink";
import {
  nativeOrWebGoogleSignIn,
  sendSignInEmail,
  checkAndCompleteEmailLink,
  setupAppLinksListener,
} from "@/lib/auth";

export default function SignInPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("mary.johnson@email.com");
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    checkAndCompleteEmailLink().then((res) => {
      if (res.success) {
        router.push("/home");
      }
    });

    const cleanup = setupAppLinksListener((url) => {
      checkAndCompleteEmailLink(url).then((res) => {
        if (res.success) {
          router.push("/home");
        }
      });
    });

    return cleanup;
  }, [router]);

  const handleSendLink = async () => {
    setIsSent(true);
    await sendSignInEmail(identifier);
    setTimeout(() => {
      router.push("/home");
    }, 800);
  };

  const handleGoogleSignIn = async () => {
    await nativeOrWebGoogleSignIn();
    router.push("/home");
  };

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-4 pb-12 flex flex-col justify-between">
        <div className="space-y-6">
          <TopBar showBack={true} showCall={false} />

          {/* Logo & Headline */}
          <div className="flex flex-col items-center text-center space-y-3 pt-2">
            <Logo size="default" />
            <PageTitle className="pt-2">Welcome back.</PageTitle>
            <p className="text-[18px] text-muted max-w-xs leading-relaxed">
              No password to remember. We&apos;ll send you a sign-in link.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4 pt-2">
            <TextField
              label="Email or mobile number"
              value={identifier}
              onChange={setIdentifier}
              placeholder="name@email.com"
              type="email"
            />

            <PrimaryButton onPress={handleSendLink}>
              {isSent ? "Sending link..." : "Send my sign-in link"}
            </PrimaryButton>

            {/* Divider "or" */}
            <div className="flex items-center gap-4 py-1">
              <span className="flex-1 h-[1px] bg-hairline" aria-hidden="true" />
              <span className="text-[16px] text-muted font-medium">or</span>
              <span className="flex-1 h-[1px] bg-hairline" aria-hidden="true" />
            </div>

            <SecondaryButton onPress={handleGoogleSignIn}>
              Continue with Google
            </SecondaryButton>

            <div className="text-center pt-2">
              <TextLink href="#password">
                Use a password instead
              </TextLink>
            </div>
          </div>
        </div>

        {/* Bottom Help line */}
        <div className="text-center text-[17px] text-navy pt-8">
          <span>Trouble signing in? </span>
          <a
            href="tel:8005550199"
            className="font-bold underline decoration-2 decoration-navy underline-offset-2 hover:text-navy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded px-1"
          >
            Call (800) 555-0199
          </a>
        </div>
      </main>
    </div>
  );
}
