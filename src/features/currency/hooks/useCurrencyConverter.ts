import { useCallback, useEffect, useState } from "react";
import type { UseCurrencyRatesResult } from "../../../hooks/useCurrencyRates";
import type { UseCurrencyConverterResult } from "../types/currency.types";
import { sanitizeCurrencyInput } from "../utils/currencyHelpers";

/**
 * Custom hook for managing currency converter state and logic
 * 
 * @param currencyRates Currency rates data from API
 * @returns Currency state and handlers
 */
export function useCurrencyConverter(
    currencyRates: UseCurrencyRatesResult
): UseCurrencyConverterResult {
    const { currencies, convert, error: ratesError } = currencyRates;

    // State
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [inputValue, setInputValue] = useState("0");
    const [outputValue, setOutputValue] = useState("0");

    // Set default currencies when rates load
    useEffect(() => {
        if (currencies.length === 0) return;
        setFromCurrency((prev) => {
            if (prev && currencies.includes(prev)) return prev;
            return currencies[0] ?? prev ?? "USD";
        });
        setToCurrency((prev) => {
            if (prev && currencies.includes(prev) && prev !== fromCurrency) return prev;
            const alternate = currencies.find((code) => code !== fromCurrency);
            return alternate ?? prev ?? "EUR";
        });
    }, [currencies, fromCurrency]);

    // Ensure two different currencies are selected
    const ensureDistinctCurrency = useCallback(
        (next: string, other: string) => {
            if (next !== other) return next;
            const alternate = currencies.find((code) => code !== next);
            return alternate ?? next;
        },
        [currencies]
    );

    // Handlers
    const handleFromCurrencyChange = useCallback(
        (code: string) => {
            setFromCurrency(code);
            setToCurrency((prev) => ensureDistinctCurrency(prev, code));
        },
        [ensureDistinctCurrency]
    );

    const handleToCurrencyChange = useCallback(
        (code: string) => {
            setToCurrency(code);
            setFromCurrency((prev) => ensureDistinctCurrency(prev, code));
        },
        [ensureDistinctCurrency]
    );

    const handleInputValueChange = useCallback((value: string) => {
        setInputValue(sanitizeCurrencyInput(value));
    }, []);

    const handleNumber = useCallback((digit: string) => {
        setInputValue((prev) => {
            const normalized = prev === "0" ? "" : prev;
            return sanitizeCurrencyInput(`${normalized}${digit}`);
        });
    }, []);

    const handleDecimal = useCallback(() => {
        setInputValue((prev) => (prev.includes(".") ? prev : `${prev}.`));
    }, []);

    const handleClear = useCallback(() => {
        setInputValue("0");
        setOutputValue("0");
    }, []);

    const handleBackspace = useCallback(() => {
        setInputValue((prev) => {
            if (prev.length <= 1) return "0";
            const next = prev.slice(0, -1);
            if (next === "" || next === ".") return "0";
            return next;
        });
    }, []);

    // Auto-convert when input or currencies change
    useEffect(() => {
        const numericInput = parseFloat(inputValue);
        if (!Number.isFinite(numericInput) || currencies.length === 0 || ratesError) {
            setOutputValue("");
            return;
        }
        const resultValue = convert(numericInput, fromCurrency, toCurrency);
        if (resultValue === null) {
            setOutputValue("");
            return;
        }
        setOutputValue(
            resultValue.toLocaleString(undefined, { maximumFractionDigits: 4 })
        );
    }, [convert, currencies, fromCurrency, inputValue, ratesError, toCurrency]);

    return {
        fromCurrency,
        toCurrency,
        inputValue,
        outputValue,
        handlers: {
            onFromCurrencyChange: handleFromCurrencyChange,
            onToCurrencyChange: handleToCurrencyChange,
            onInputValueChange: handleInputValueChange,
            onNumber: handleNumber,
            onDecimal: handleDecimal,
            onClear: handleClear,
            onBackspace: handleBackspace,
        },
    };
}
