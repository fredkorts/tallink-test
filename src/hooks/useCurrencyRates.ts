import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchRates } from "../services/ratesService";
import type { CurrencyRates } from "../services/types";
import useLocalStorage from "./useLocalStorage";
import { RATES_CACHE_DURATION, RATES_CACHE_KEY } from "../utils/constants";

interface CurrencyRatesState {
  rates: CurrencyRates | null;
  timestamp: string | null;
  loading: boolean;
  error: string | null;
}

interface CachedRates {
  rates: CurrencyRates;
  timestamp: string;
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
  const [cachedData, setCachedData] = useLocalStorage<CachedRates | null>(
    RATES_CACHE_KEY,
    null
  );

  const [state, setState] = useState<CurrencyRatesState>({
    rates: cachedData?.rates || null,
    timestamp: cachedData?.timestamp || null,
    loading: false,
    error: null,
  });

  const loadRates = useCallback(async (forceRefresh = false) => {

    // Check if cache is valid
    if (!forceRefresh && cachedData && cachedData.timestamp) {
      const cacheTime = new Date(cachedData.timestamp).getTime();
      const now = new Date().getTime();
      const isValid = now - cacheTime < RATES_CACHE_DURATION;


      if (isValid) {

        setState({
          rates: cachedData.rates,
          timestamp: cachedData.timestamp,
          loading: false,
          error: null,
        });
        return;
      }
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetchRates();

      const newData = {
        rates: response.rates,
        timestamp: response.timestamp,
      };

      setCachedData(newData);
      setState({
        ...newData,
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
  }, [cachedData, setCachedData]);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  const refresh = useCallback(async () => {
    await loadRates(true);
  }, [loadRates]);

  const currencies = useMemo(() => {
    if (!state.rates) {
      return [];
    }
    const keys = Object.keys(state.rates).sort();
    return keys;
  }, [state.rates]);

  const convert = useCallback(
    (amount: number, from: string, to: string) => {
      if (!state.rates || !Number.isFinite(amount)) {
        return null;
      }
      if (from === to) return amount;
      const rate = state.rates[from]?.[to];
      if (typeof rate !== "number") {
        return null;
      }
      const result = amount * rate;
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
    refresh,
    convert,
  };
}
