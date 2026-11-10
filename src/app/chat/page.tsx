"use client";

import React, { useEffect, useRef, useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Send, Phone, Bot } from "lucide-react";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageTitle } from "@/components/ui/PageTitle";
import { app } from "@/lib/firebase";
import { isChatEnabled, SUPPORT_PHONE, SUPPORT_PHONE_TEL } from "@/lib/config";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hi! I'm the Senior Home Mods helper. I'm a computer program (AI), not a person. I can answer questions about the program and this app. For decisions about your case, your counselor will help you.",
};

const SUGGESTIONS = ["What happens next?", "Which papers will I need?", "How do I take the online class?", "Can I talk to a person?"];

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const send = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || sending) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setText("");

    if (!isChatEnabled) {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: `The chat helper isn't turned on yet. Please call us at ${SUPPORT_PHONE}. A real person will help you.`,
        },
      ]);
      return;
    }

    setSending(true);
    try {
      const call = httpsCallable<{ messages: Msg[] }, { reply: string }>(getFunctions(app, "us-central1"), "supportChat");
      // Send the conversation without the fixed welcome message, and keep it short.
      const history = next.filter((m) => m !== WELCOME).slice(-19);
      const res = await call({ messages: history });
      setMessages([...next, { role: "assistant", content: res.data.reply }]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: `Sorry, I can't answer right now. Please try again, or call us at ${SUPPORT_PHONE}.` },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-ivory flex flex-col items-center">
      <main id="main-content" className="w-full max-w-md mx-auto min-h-screen bg-ivory px-6 py-6 pb-36 flex flex-col gap-5">
        <div className="space-y-2">
          <Eyebrow>MESSAGES</Eyebrow>
          <PageTitle>Ask our helper</PageTitle>
          <a
            href={`tel:${SUPPORT_PHONE_TEL}`}
            className="inline-flex items-center gap-2 min-h-[48px] text-[18px] font-bold text-navy underline decoration-gold underline-offset-4"
          >
            <Phone className="w-5 h-5" aria-hidden="true" /> Rather talk to a person? Call <span className="whitespace-nowrap">{SUPPORT_PHONE}</span>
          </a>
        </div>

        <div role="log" aria-live="polite" aria-label="Conversation" className="flex-1 space-y-3">
          {messages.map((m, i) =>
            m.role === "assistant" ? (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-navy text-gold-on-navy flex items-center justify-center shrink-0" aria-hidden="true">
                  <Bot className="w-5 h-5" />
                </div>
                <p className="max-w-[85%] p-4 rounded-[18px] rounded-tl-[6px] bg-white border border-hairline text-[18px] text-navy leading-relaxed whitespace-pre-wrap">
                  <span className="sr-only">Helper says: </span>
                  {m.content}
                </p>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <p className="max-w-[85%] p-4 rounded-[18px] rounded-tr-[6px] bg-navy text-white text-[18px] leading-relaxed whitespace-pre-wrap">
                  <span className="sr-only">You said: </span>
                  {m.content}
                </p>
              </div>
            )
          )}
          {sending && <p className="text-[17px] text-muted pl-[52px]" role="status">The helper is typing…</p>}
          <div ref={endRef} />
        </div>

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2" aria-label="Suggested questions">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="min-h-[48px] px-4 rounded-full border-2 border-navy bg-white text-navy font-bold text-[16px] hover:bg-sand focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(text);
          }}
          className="flex gap-2 items-end"
        >
          <label htmlFor="chat-input" className="sr-only">Type your question</label>
          <textarea
            id="chat-input"
            rows={2}
            value={text}
            maxLength={1500}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(text);
              }
            }}
            placeholder="Type your question"
            className="flex-1 min-h-[60px] p-4 rounded-[14px] border-2 border-control bg-white text-[18px] text-navy placeholder:text-muted resize-none focus-visible:outline-none focus-visible:border-navy focus-visible:ring-3 focus-visible:ring-focus"
          />
          <button
            type="submit"
            disabled={sending || !text.trim()}
            aria-label="Send"
            className="w-[60px] h-[60px] rounded-[14px] bg-navy text-white flex items-center justify-center shrink-0 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-focus"
          >
            <Send className="w-6 h-6" aria-hidden="true" />
          </button>
        </form>
        <p className="text-[15px] text-muted">Please don&apos;t type your Social Security number, bank details, or passwords here.</p>
      </main>
      <BottomTabBar />
    </div>
  );
}
