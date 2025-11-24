import { useCallback, useEffect, useState } from "react";
import { deleteHistory, getHistory, postHistory } from "../../../services/historyService";

export type HistoryEntryValue = string | number | null | undefined;

export interface HistoryEntry {
  operand1?: HistoryEntryValue;
  operator?: HistoryEntryValue;
  operand2?: HistoryEntryValue;
  result?: HistoryEntryValue;
}

export type HistoryInput = string | HistoryEntry;

// Utility to format a history entry
function formatHistoryEntry({ operand1, operator, operand2, result }: HistoryEntry): string {
  // Helper to sanitize and format numbers/strings
  const safe = (val: HistoryEntryValue, fallback = "—") => {
    if (val === undefined || val === null || val === "undefined" || val === "null") return fallback;
    if (typeof val === "number" && !Number.isFinite(val)) return fallback;
    if (typeof val === "string") return val.trim();
    return String(val);
  };

  const op1 = safe(operand1, "");
  const op = safe(operator, "");
  const op2 = safe(operand2, "");
  let res: HistoryEntryValue = result;

  if (res === undefined || res === null || res === "undefined" || res === "null") res = "—";
  else if (typeof res === "number" && !Number.isFinite(res)) res = "—";
  else if (typeof res === "string") res = res.trim();

  return `${op1}${op}${op2}=${res}`;
}

interface UseHistoryResult {
  history: string[];
  addHistoryEntry: (entry: HistoryInput) => Promise<void>;
  clearHistory: () => Promise<void>;
}

export default function useHistory(): UseHistoryResult {
  const [history, setHistory] = useState<string[]>(() => {
    // Start with localStorage for SSR/fast load, then hydrate from API
    try {
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        const stored = localStorage.getItem("calc_history");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
      }
    } catch {
      /* empty */
    }
    return [];
  });

  // Hydrate from API on mount (browser only)
  useEffect(() => {
    let mounted = true;
    async function fetchHistory() {
      if (typeof window === "undefined") return;
      try {
        const apiHistory = await getHistory();
        if (mounted && Array.isArray(apiHistory)) {
          // Use operation/result fields to match local format
          setHistory(apiHistory.map((h) => h.operation || h.result || ""));
        }
      } catch {
        // Ignore API errors, keep local state
      }
    }
    fetchHistory();
    return () => {
      mounted = false;
    };
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      if (history.length === 0) {
        localStorage.removeItem("calc_history");
      } else {
        localStorage.setItem("calc_history", JSON.stringify(history));
      }
    }
  }, [history]);

  // Add a new entry (and POST to API)
  const addHistoryEntry = useCallback(async (entryObj: HistoryInput) => {
    const entry = typeof entryObj === "string" ? entryObj : formatHistoryEntry(entryObj);
    setHistory((prev) => [...prev, entry]);
    try {
      // Use postHistory service for API call
      await postHistory({ operation: entry, result: "", timestamp: undefined });
    } catch {
      // Ignore API errors, rely on localStorage
    }
  }, []);

  // Clear all history
  const clearHistory = useCallback(async () => {
    setHistory([]);
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.removeItem("calc_history");
    }
    try {
      await deleteHistory();
    } catch {
      // Ignore API errors, local state already cleared
    }
  }, []);

  return { history, addHistoryEntry, clearHistory };
}
