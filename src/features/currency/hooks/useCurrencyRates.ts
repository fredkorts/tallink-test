import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchRates } from "../../../services/ratesService";
import { CurrencyRates } from "../../../services/types";
import { formatElapsedTime } from "../utils/timeFormatters";

interface CurrencyRatesState {
  rates: CurrencyRates | null;
  timestamp: string | null;
  loading: boolean;
  error: string | null;
}

export function useCurrencyRates() {
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

  const elapsed = useMemo(
    () => (state.timestamp ? formatElapsedTime(state.timestamp) : ""),
    [state.timestamp],
  );

  return {
    rates: state.rates,
    timestamp: state.timestamp,
    loading: state.loading,
    error: state.error,
    refresh: loadRates,
    elapsed,
  };
}
