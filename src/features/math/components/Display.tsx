import { SPECIAL_VALUES } from "../../../utils/constants";
import styles from "./Display.module.css";
import React from "react";

interface DisplayProps {
  mode?: "math" | "currency";
  // Math mode props
  expression?: string;
  result?: string | null;
  history?: string[];
  isError?: boolean;
  // Currency mode props
  fromCurrency?: string;
  toCurrency?: string;
  onFromCurrencyChange?: (currency: string) => void;
  onToCurrencyChange?: (currency: string) => void;
  inputValue?: string;
  onInputValueChange?: (val: string) => void;
  outputValue?: string;
}

export default function Display(props: DisplayProps) {
  const {
    mode = "math",
    expression = "",
    result = null,
    history = [],
    isError = false,
    fromCurrency = "USD",
    toCurrency = "EUR",
    onFromCurrencyChange,
    onToCurrencyChange,
    inputValue = "",
    onInputValueChange,
    outputValue = "",
  } = props;

  if (mode === "currency") {
    return (
      <div className={styles["display"]} aria-live="polite">
        {/* Top row: editable input */}
        <div className={styles["currencyRow"]}>
          <select
            className={styles["currencySelect"]}
            value={fromCurrency}
            onChange={e => onFromCurrencyChange && onFromCurrencyChange(e.target.value)}
          >
            {/* Example options, replace with real list */}
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <input
            className={styles["currencyInput"]}
            type="text"
            value={inputValue}
            onChange={e => onInputValueChange && onInputValueChange(e.target.value)}
            inputMode="decimal"
          />
        </div>
        {/* Bottom row: calculated output */}
        <div className={styles["currencyRow"]}>
          <select
            className={styles["currencySelect"]}
            value={toCurrency}
            onChange={e => onToCurrencyChange && onToCurrencyChange(e.target.value)}
          >
            {/* Example options, replace with real list */}
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <div className={styles["currencyOutput"]}>{outputValue}</div>
        </div>
      </div>
    );
  }

  // Math mode (default)
  const visibleValue = isError ? SPECIAL_VALUES.NAN : result ?? expression;
  return (
    <div className={styles["display"]} aria-live="polite">
      <div className={styles["history"]}>
        {history.length > 0 ? (
          history.slice(-3).map((entry, i) => <div key={i}>{entry}</div>)
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
      <div className={styles["result"]}>{visibleValue}</div>
    </div>
  );
}
