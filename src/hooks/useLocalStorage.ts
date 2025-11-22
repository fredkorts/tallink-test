
import { useState, useEffect, Dispatch, SetStateAction } from "react";

/**
 * Minimal localStorage hook with optional runtime validation and cross-tab sync.
 */
export type TypeGuard<T> = (value: unknown) => value is T;

function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validator?: TypeGuard<T>
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      const parsed = JSON.parse(item);
      if (validator && !validator(parsed)) {
        console.error(`localStorage validation failed for key "${key}". Using initialValue.`);
        return initialValue;
      }
      return parsed as T;
    } catch {
      return initialValue;
    }
  });

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    setStoredValue((prev) => {
      const newValue = typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
      if (validator && !validator(newValue)) {
        console.error(`localStorage validation failed for key "${key}". Update cancelled.`);
        return prev;
      }
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch {}
      return newValue;
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) {
        if (e.newValue === null) {
          setStoredValue(initialValue);
        } else {
          try {
            const parsed = JSON.parse(e.newValue);
            if (!validator || validator(parsed)) {
              setStoredValue(parsed);
            }
          } catch {}
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, initialValue, validator]);

  return [storedValue, setValue];
}

export default useLocalStorage;
