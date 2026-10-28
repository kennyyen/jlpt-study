"use client";

import { useCallback, useSyncExternalStore } from "react";

// localStorage-backed state shared by every component that uses the same key.
// Reads go through useSyncExternalStore so the server render (and the static
// export) uses the fallback and the browser picks up saved values on hydrate.

const listeners = new Map<string, Set<() => void>>();
const cache = new Map<string, { raw: string | null; value: unknown }>();
// Values that could not be saved (storage full or blocked, e.g. private mode)
// are kept here so the app still works for the rest of the page view.
const memory = new Map<string, unknown>();

function subscribe(key: string, cb: () => void) {
  let set = listeners.get(key);
  if (!set) listeners.set(key, (set = new Set()));
  set.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === key) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    set.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function read<T>(key: string, fallback: T): T {
  if (memory.has(key)) return memory.get(key) as T;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return fallback;
  }
  const hit = cache.get(key);
  // Return the same object while the stored string is unchanged, as
  // useSyncExternalStore requires a stable snapshot.
  if (hit && hit.raw === raw) return hit.value as T;
  let value: T = fallback;
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  cache.set(key, { raw, value });
  return value;
}

/** `fallback` must be referentially stable (e.g. a module-level constant). */
export function useStoredState<T>(key: string, fallback: T) {
  const value = useSyncExternalStore(
    (cb) => subscribe(key, cb),
    () => read(key, fallback),
    () => fallback,
  );

  const setValue = useCallback(
    (update: T | ((prev: T) => T)) => {
      const prev = read(key, fallback);
      const next = typeof update === "function" ? (update as (p: T) => T)(prev) : update;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
        memory.delete(key);
      } catch {
        memory.set(key, next);
      }
      listeners.get(key)?.forEach((cb) => cb());
    },
    [key, fallback],
  );

  return [value, setValue] as const;
}
