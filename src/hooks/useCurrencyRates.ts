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
    console.debug('[useCurrencyRates] Fetching rates...');
    try {
      const response = await fetchRates();
      console.debug('[useCurrencyRates] Fetched rates response:', response);
      setState({
        rates: response.rates,
        timestamp: response.timestamp,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('[useCurrencyRates] Error fetching rates:', error);
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

  useEffect(() => {
    console.debug('[useCurrencyRates] State updated:', state);
  }, [state]);

  const currencies = useMemo(() => {
    if (!state.rates) {
      console.debug('[useCurrencyRates] No rates available for currencies.');
      return [];
    }
    const keys = Object.keys(state.rates).sort();
    console.debug('[useCurrencyRates] Available currencies:', keys);
    return keys;
  }, [state.rates]);

  const convert = useCallback(
    (amount: number, from: string, to: string) => {
      if (!state.rates || !Number.isFinite(amount)) {
        console.warn('[useCurrencyRates] Cannot convert: missing rates or invalid amount', { amount, from, to });
        return null;
      }
      if (from === to) return amount;
      const rate = state.rates[from]?.[to];
      if (typeof rate !== "number") {
        console.warn('[useCurrencyRates] No rate found for conversion', { from, to, rates: state.rates });
        return null;
      }
      const result = amount * rate;
      console.debug(`[useCurrencyRates] Converted ${amount} ${from} to ${result} ${to} (rate: ${rate})`);
      return result;
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
