import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchRates } from "../services/ratesService";
import type { CurrencyRates } from "../services/types";

interface CurrencyRatesState {
  rates: CurrencyRates | null;
  timestamp: string | null;
  loading: boolean;
  error: string | null;
}

export interface UseCurrencyRatesResult {
  rates: CurrencyRates | null;
  currencies: string[];
  timestamp: string | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  convert: (amount: number, from: string, to: string) => number | null;
}

export function useCurrencyRates(): UseCurrencyRatesResult {
  const [state, setState] = useState<CurrencyRatesState>({
    rates: null,
    timestamp: null,
    loading: false,
    error: null,
  });

  const loadRates = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetchRates();
      setState({
        rates: response.rates,
        timestamp: response.timestamp,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : String(error),
      }));
    }
  }, []);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  const currencies = useMemo(() => {
    if (!state.rates) return [];
    return Object.keys(state.rates).sort();
  }, [state.rates]);

  const convert = useCallback(
    (amount: number, from: string, to: string) => {
      if (!state.rates || !Number.isFinite(amount)) return null;
      if (from === to) return amount;
      const rate = state.rates[from]?.[to];
      if (typeof rate !== "number") return null;
      return amount * rate;
    },
    [state.rates],
  );

  return {
    rates: state.rates,
    currencies,
    timestamp: state.timestamp,
    loading: state.loading,
    error: state.error,
    refresh: loadRates,
    convert,
  };
}
