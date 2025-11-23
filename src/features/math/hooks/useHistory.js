/* global localStorage */
import { useState, useEffect } from "react";
import { postHistory, getHistory, deleteHistory } from "../../../services/historyService";

// Utility to format a history entry
function formatHistoryEntry({ operand1, operator, operand2, result }) {
  // Helper to sanitize and format numbers/strings
  const safe = (val, fallback = "—") => {
    if (val === undefined || val === null || val === "undefined" || val === "null") return fallback;
    if (typeof val === "number" && !Number.isFinite(val)) return fallback;
    if (typeof val === "string") return val.trim();
    return String(val);
  };
  const op1 = safe(operand1, "");
  const op = safe(operator, "");
  const op2 = safe(operand2, "");
  let res = result;
  if (res === undefined || res === null || res === "undefined" || res === "null") res = "—";
  else if (typeof res === "number" && !Number.isFinite(res)) res = "—";
  else if (typeof res === "string") res = res.trim();
  return `${op1}${op}${op2}=${res}`;
}

export default function useHistory() {
  const [history, setHistory] = useState(() => {
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
  async function addHistoryEntry(entryObj) {
    const entry = typeof entryObj === "string" ? entryObj : formatHistoryEntry(entryObj);
    setHistory((prev) => [...prev, entry]);
    try {
      // Use postHistory service for API call
      await postHistory({ operation: entry, result: "", timestamp: undefined });
    } catch {
      // Ignore API errors, rely on localStorage
    }
  }

  // Clear all history
  async function clearHistory() {
    setHistory([]);
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.removeItem("calc_history");
    }
    try {
      await deleteHistory();
    } catch {
      // Ignore API errors, local state already cleared
    }
  }

  return { history, addHistoryEntry, clearHistory };
}
