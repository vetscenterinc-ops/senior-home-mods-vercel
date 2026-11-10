"use client";

import React, { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { WifiOff } from "lucide-react";

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    let removeListener: (() => void) | undefined;
    if (Capacitor.isNativePlatform()) {
      import("@capacitor/network").then(({ Network }) => {
        Network.getStatus().then((status) => {
          setIsOnline(status.connected);
        });
        const handle = Network.addListener("networkStatusChange", (status) => {
          setIsOnline(status.connected);
        });
        removeListener = () => {
          handle.then((h) => h.remove());
        };
      });
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (removeListener) removeListener();
    };
  }, []);

  return isOnline;
}

export function OfflineBanner() {
  const isOnline = useNetworkStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-0 z-50 w-full bg-[#faf7f1] border-b-2 border-gold/50 px-4 py-3 shadow-[0_4px_16px_rgba(11,42,74,0.08)] transition-all animate-in fade-in slide-in-from-top duration-300"
    >
      <div className="max-w-md mx-auto flex items-center justify-center gap-2.5 text-center">
        <WifiOff className="w-5 h-5 text-navy shrink-0 stroke-[2.2]" aria-hidden="true" />
        <p className="text-[15px] sm:text-[16px] font-semibold text-navy leading-snug">
          You&apos;re offline. We&apos;ll finish this when you&apos;re back online.
        </p>
      </div>
    </div>
  );
}
