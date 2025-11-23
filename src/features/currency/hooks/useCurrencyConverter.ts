import { useCallback, useMemo, useState } from "react";
import {
  CURRENCIES,
  CurrencyCode,
  DECIMAL_POINT,
  DEFAULT_SOURCE_CURRENCY,
  DEFAULT_TARGET_CURRENCY,
  MAX_DIGITS,
} from "../../../utils/constants";
import { CurrencyRates } from "../../../services/types";
import { convertAmount } from "../utils/currencyCalculations";

const digitMatcher = /^[0-9]*$/;

export function useCurrencyConverter(rates: CurrencyRates | null) {
  const [amount, setAmount] = useState<string>("0");
  const [sourceCurrency, setSourceCurrency] = useState<CurrencyCode>(DEFAULT_SOURCE_CURRENCY);
  const [targetCurrency, setTargetCurrency] = useState<CurrencyCode>(DEFAULT_TARGET_CURRENCY);

  const sanitizedAmount = amount === "" ? 0 : parseFloat(amount);

  const convertedAmount = useMemo(() => {
    if (!Number.isFinite(sanitizedAmount)) return NaN;
    return convertAmount(sanitizedAmount, rates, sourceCurrency, targetCurrency);
  }, [rates, sanitizedAmount, sourceCurrency, targetCurrency]);

  const handleAmountChange = useCallback((value: string) => {
    const trimmed = value.trim();
    if (trimmed === "") {
      setAmount("");
      return;
    }
    if (!/^\d*(?:\.\d*)?$/.test(trimmed)) return;
    const digitsOnly = trimmed.replace(/\D/g, "");
    if (digitsOnly.length > MAX_DIGITS) return;
    setAmount(trimmed);
  }, []);

  const handleKeypadInput = useCallback(
    (value: string) => {
      if (value === DECIMAL_POINT) {
        if (amount.includes(DECIMAL_POINT)) return;
        setAmount((prev) => (prev ? `${prev}${DECIMAL_POINT}` : `0${DECIMAL_POINT}`));
        return;
      }

      if (!digitMatcher.test(value)) return;
      const candidate = amount === "0" ? value : `${amount}${value}`;
      const digitsOnly = candidate.replace(/\D/g, "");
      if (digitsOnly.length > MAX_DIGITS) return;
      setAmount(candidate);
    },
    [amount],
  );

  const clearAmount = useCallback(() => setAmount("0"), []);
  const backspace = useCallback(() => {
    setAmount((prev) => {
      if (!prev || prev === "0") return "0";
      const next = prev.slice(0, -1);
      return next.length === 0 ? "0" : next;
    });
  }, []);

  const swapCurrencies = useCallback(() => {
    setSourceCurrency((prev) => {
      const next = targetCurrency;
      setTargetCurrency(prev);
      return next;
    });
  }, [targetCurrency]);

  return {
    amount,
    convertedAmount,
    sourceCurrency,
    targetCurrency,
    currencies: CURRENCIES,
    setAmount: handleAmountChange,
    setSourceCurrency,
    setTargetCurrency,
    handleKeypadInput,
    clearAmount,
    backspace,
    swapCurrencies,
  };
}
