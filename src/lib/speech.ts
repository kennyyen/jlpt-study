"use client";

import { useSyncExternalStore } from "react";
import { useStoredState } from "./storage";

// Japanese text-to-speech with the browser's built-in voices (Web Speech API).
// Quality depends on the device: Apple devices ship good Japanese voices.

export const SPEECH_RATES = { normal: 1, slow: 0.7 } as const;
export type SpeechRate = keyof typeof SPEECH_RATES;
const DEFAULT_RATE: SpeechRate = "normal";

export function useSpeechRate() {
  return useStoredState<SpeechRate>("jlpt:speech-rate", DEFAULT_RATE);
}

const noop = () => () => {};

/** False during the server render, so the button only appears in browsers that can speak. */
export function useSpeechSupported() {
  return useSyncExternalStore(
    noop,
    () => typeof window !== "undefined" && !!window.speechSynthesis && typeof SpeechSynthesisUtterance === "function",
    () => false,
  );
}

function japaneseVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.replace("_", "-").startsWith("ja"));
  // Prefer locally installed voices: they start faster and work offline.
  return voices.find((v) => v.localService) ?? voices[0];
}

/**
 * Speak Japanese text. Long text is split into sentences because some
 * browsers stop speaking a single utterance after about 15 seconds.
 */
export function speak(text: string, rate: SpeechRate, onDone?: () => void) {
  const synth = window.speechSynthesis;
  synth.cancel();
  const parts = text
    .split(/(?<=[。！？\n])/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) {
    onDone?.();
    return;
  }
  const voice = japaneseVoice();
  parts.forEach((part, i) => {
    const u = new SpeechSynthesisUtterance(part);
    u.lang = "ja-JP";
    if (voice) u.voice = voice;
    u.rate = SPEECH_RATES[rate];
    if (i === parts.length - 1) {
      u.onend = () => onDone?.();
      u.onerror = () => onDone?.();
    }
    synth.speak(u);
  });
}

export function stopSpeaking() {
  window.speechSynthesis.cancel();
}
