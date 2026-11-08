"use client";

import { useState } from "react";
import { speak, stopSpeaking, useSpeechRate, useSpeechSupported } from "@/lib/speech";

/** 🔊 button that reads Japanese text aloud; tap again to stop. Hidden where speech isn't supported. */
export function SpeakButton({ text, label = "Listen", className = "" }: { text: string; label?: string; className?: string }) {
  const supported = useSpeechSupported();
  const [rate] = useSpeechRate();
  const [speaking, setSpeaking] = useState(false);

  if (!supported) return null;

  return (
    <button
      type="button"
      aria-label={speaking ? "Stop" : label}
      title={speaking ? "Stop" : label}
      onClick={(e) => {
        // Don't trigger parent controls (e.g. a <summary> that toggles open).
        e.preventDefault();
        e.stopPropagation();
        if (speaking) {
          stopSpeaking();
          setSpeaking(false);
        } else {
          setSpeaking(true);
          speak(text, rate, () => setSpeaking(false));
        }
      }}
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full align-middle transition ${
        speaking ? "bg-accent text-white" : "text-muted hover:bg-foreground/10 hover:text-foreground"
      } ${className}`}
    >
      {speaking ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

/** Footer toggle between normal and slow speech. */
export function SpeechRateToggle() {
  const supported = useSpeechSupported();
  const [rate, setRate] = useSpeechRate();
  if (!supported) return null;
  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={rate === "slow"}
        onChange={(e) => setRate(e.target.checked ? "slow" : "normal")}
        className="accent-[var(--accent)]"
      />
      Slow audio
    </label>
  );
}
