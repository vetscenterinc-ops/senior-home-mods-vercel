"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type RecipientType = "myself" | "someone_else" | null;
export type TextSizeType = "100" | "112" | "125";

interface HomeModsContextType {
  recipient: RecipientType;
  setRecipient: (value: RecipientType) => void;
  homePossessive: string;
  textSize: TextSizeType;
  setTextSize: (size: TextSizeType) => void;
}

const HomeModsContext = createContext<HomeModsContextType | undefined>(undefined);

const STORAGE_KEY_RECIPIENT = "home_mods_recipient";
const STORAGE_KEY_TEXT_SIZE = "home_mods_text_size";

export function HomeModsProvider({ children }: { children: React.ReactNode }) {
  const [recipient, setRecipientState] = useState<RecipientType>(null);
  const [textSize, setTextSizeState] = useState<TextSizeType>("100");

  useEffect(() => {
    try {
      const storedRecipient = localStorage.getItem(STORAGE_KEY_RECIPIENT);
      if (storedRecipient === "myself" || storedRecipient === "someone_else") {
        setRecipientState(storedRecipient);
      }

      const storedSize = localStorage.getItem(STORAGE_KEY_TEXT_SIZE);
      if (storedSize === "100" || storedSize === "112" || storedSize === "125") {
        setTextSizeState(storedSize as TextSizeType);
        document.documentElement.setAttribute("data-text-size", storedSize);
      } else {
        document.documentElement.setAttribute("data-text-size", "100");
      }
    } catch {
      // Storage unavailable or SSR fallback
    }
  }, []);

  const setRecipient = (value: RecipientType) => {
    setRecipientState(value);
    try {
      if (value) {
        localStorage.setItem(STORAGE_KEY_RECIPIENT, value);
      } else {
        localStorage.removeItem(STORAGE_KEY_RECIPIENT);
      }
    } catch {
      // Ignore local storage error
    }
  };

  const setTextSize = (size: TextSizeType) => {
    setTextSizeState(size);
    try {
      localStorage.setItem(STORAGE_KEY_TEXT_SIZE, size);
      document.documentElement.setAttribute("data-text-size", size);
    } catch {
      // Ignore
    }
  };

  const homePossessive = recipient === "someone_else" ? "their home" : "your home";

  return (
    <HomeModsContext.Provider
      value={{
        recipient,
        setRecipient,
        homePossessive,
        textSize,
        setTextSize,
      }}
    >
      {children}
    </HomeModsContext.Provider>
  );
}

export function useHomeMods() {
  const context = useContext(HomeModsContext);
  if (!context) {
    throw new Error("useHomeMods must be used within a HomeModsProvider");
  }
  return context;
}
