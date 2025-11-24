import { useCallback, useEffect, useState } from "react";
import { useCalculator, type Operator } from "../../hooks/useCalculator";
import useHistory from "../../hooks/useHistory";
import { CALCULATOR_MODES, OPERATIONS, type CalculatorMode } from "../../../../utils/constants";
import styles from "./MathCalculator.module.css";
import CalculatorLayout from "../CalculatorLayout";
import type { KeypadProps } from "../Keypad";
import { useCurrencyRates } from "../../../hooks/useCurrencyRates";

export interface MathCalculatorProps {
  mode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
}

export default function MathCalculator({ mode, onModeChange }: MathCalculatorProps) {
  // Math mode state/hooks
  const {
    expression,
    result,
    lastEntry,
    isError,
    handleNumberInput,
    handleDecimalInput,
    handleOperatorInput,
    handleEquals,
    handleClear,
    handleBackspace,
  } = useCalculator();
  const { history, addHistoryEntry } = useHistory();

  // Currency data from API
  const { currencies, loading: ratesLoading, error: ratesError, convert } = useCurrencyRates();

  // Currency mode state
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [inputValue, setInputValue] = useState("0");
  const [outputValue, setOutputValue] = useState("0");

  const isMathMode = mode === CALCULATOR_MODES.MATH;

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
  }, [currencies, fromCurrency, toCurrency]);

  const ensureDistinctCurrency = useCallback(
    (next: string, other: string) => {
      if (next !== other) return next;
      const alternate = currencies.find((code) => code !== next);
      return alternate ?? next;
    },
    [currencies],
  );

  const handleFromCurrencyChange = useCallback(
    (code: string) => {
      setFromCurrency(code);
      setToCurrency((prev) => ensureDistinctCurrency(prev, code));
    },
    [ensureDistinctCurrency],
  );

  const handleToCurrencyChange = useCallback(
    (code: string) => {
      setToCurrency(code);
      setFromCurrency((prev) => ensureDistinctCurrency(prev, code));
    },
    [ensureDistinctCurrency],
  );

  const sanitizeInput = useCallback((value: string) => {
    const cleaned = value.replace(/[^\d.]/g, "");
    const [integer = "", ...decimalParts] = cleaned.split(".");
    const decimal = decimalParts.join("");
    const sanitizedInteger = integer.replace(/^0+(?=\d)/, "") || "0";
    if (cleaned.endsWith(".") && decimal === "") {
      return `${sanitizedInteger}.`;
    }
    const sanitizedDecimal = decimal ? `.${decimal.slice(0, 6)}` : "";
    return `${sanitizedInteger}${sanitizedDecimal}`;
  }, []);

  const handleInputValueChange = useCallback(
    (value: string) => {
      setInputValue(sanitizeInput(value));
    },
    [sanitizeInput],
  );

  const appendDigit = useCallback(
    (digit: string) => {
      setInputValue((prev) => {
        const normalized = prev === "0" ? "" : prev;
        return sanitizeInput(`${normalized}${digit}`);
      });
    },
    [sanitizeInput],
  );

  const handleDecimalInputCurrency = useCallback(() => {
    setInputValue((prev) => (prev.includes(".") ? prev : `${prev}.`));
  }, []);

  const handleClearCurrency = useCallback(() => {
    setInputValue("0");
    setOutputValue("0");
  }, []);

  const handleBackspaceCurrency = useCallback(() => {
    setInputValue((prev) => {
      if (prev.length <= 1) return "0";
      const next = prev.slice(0, -1);
      if (next === "" || next === ".") return "0";
      return next;
    });
  }, []);

  useEffect(() => {
    if (isMathMode) return;
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
    setOutputValue(resultValue.toLocaleString(undefined, { maximumFractionDigits: 4 }));
  }, [convert, currencies, fromCurrency, inputValue, isMathMode, ratesError, toCurrency]);

  // Math history effect
  useEffect(() => {
    if (isMathMode && lastEntry) {
      addHistoryEntry(lastEntry);
    }
  }, [addHistoryEntry, isMathMode, lastEntry]);

  // Keyboard handler (math mode only)
  useEffect(() => {
    if (!isMathMode) return;
    const handleKey = (event: KeyboardEvent) => {
      const { key } = event;
      if (/[0-9]/.test(key)) {
        handleNumberInput(key);
      } else if (key === ".") {
        handleDecimalInput();
      } else if (["+", "-", "*", "/", "p", "P"].includes(key)) {
        event.preventDefault();
        const operatorMap: Record<string, NonNullable<Operator>> = {
          "+": OPERATIONS.ADD,
          "-": OPERATIONS.SUBTRACT,
          "*": OPERATIONS.MULTIPLY,
          "/": OPERATIONS.DIVIDE,
          p: OPERATIONS.PRIME,
          P: OPERATIONS.PRIME,
        };
        const operatorKey = key as keyof typeof operatorMap;
        const operator = operatorMap[operatorKey];
        if (!operator) return;
        handleOperatorInput(operator);
      } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        handleEquals();
      } else if (key === "Backspace") {
        handleBackspace();
      } else if (key.toLowerCase() === "c" || key === "Escape") {
        handleClear();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleBackspace, handleClear, handleDecimalInput, handleEquals, handleNumberInput, handleOperatorInput, isMathMode]);

  // Layout props
  const displayProps = isMathMode
    ? { mode: "math", expression, result, history, isError, onModeChange }
    : {
        mode: "currency" as const,
        onModeChange,
        fromCurrency,
        toCurrency,
        currencies,
        ratesLoading,
        ratesError,
        onFromCurrencyChange: handleFromCurrencyChange,
        onToCurrencyChange: handleToCurrencyChange,
        inputValue,
        onInputValueChange: handleInputValueChange,
        outputValue,
      };
  const noopOperator: (op: Operator) => void = () => {};
  const keypadProps: Omit<KeypadProps, "mode"> = isMathMode
    ? {
        onNumber: handleNumberInput,
        onDecimal: handleDecimalInput,
        onOperator: handleOperatorInput,
        onEquals: handleEquals,
        onClear: handleClear,
        onBackspace: handleBackspace,
      }
    : {
        onNumber: appendDigit,
        onDecimal: handleDecimalInputCurrency,
        onOperator: noopOperator,
        onEquals: () => {},
        onClear: handleClearCurrency,
        onBackspace: handleBackspaceCurrency,
      };

  return (
    <div className={styles["wrapper"]}>
      <CalculatorLayout mode={mode} displayProps={displayProps} keypadProps={keypadProps} />
    </div>
  );
}
