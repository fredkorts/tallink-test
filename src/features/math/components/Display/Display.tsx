import { CALCULATOR_MODES, type CalculatorMode, SPECIAL_VALUES } from "../../../../utils/constants";
import styles from "./Display.module.css";

type BaseDisplayProps = {
  mode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
};

type MathDisplayProps = BaseDisplayProps & {
  mode: "math";
  expression: string;
  result: string | null;
  history: string[];
  isError: boolean;
};

type CurrencyDisplayProps = BaseDisplayProps & {
  mode: "currency";
  fromCurrency: string;
  toCurrency: string;
  currencies: string[];
  ratesLoading: boolean;
  ratesError: string | null;
  onFromCurrencyChange: (currency: string) => void;
  onToCurrencyChange: (currency: string) => void;
  inputValue: string;
  onInputValueChange: (val: string) => void;
  outputValue: string;
};

export type DisplayProps = MathDisplayProps | CurrencyDisplayProps;

export default function Display(props: DisplayProps) {
  const renderModeToggle = () => (
    <div className={styles["modeToggle"]}>
      {props.mode === CALCULATOR_MODES.MATH ? (
        <span className={styles["modeToggleLabel"]}>Calculator</span>
      ) : (
        <button
          type="button"
          className={styles["modeToggleButton"]}
          onClick={() => props.onModeChange(CALCULATOR_MODES.MATH)}
        >
          Calculator
        </button>
      )}

      <span className={styles["modeToggleDivider"]}>|</span>

      {props.mode === CALCULATOR_MODES.CURRENCY ? (
        <span className={styles["modeToggleLabel"]}>Exchange Rate</span>
      ) : (
        <button
          type="button"
          className={styles["modeToggleButton"]}
          onClick={() => props.onModeChange(CALCULATOR_MODES.CURRENCY)}
        >
          Exchange Rate
        </button>
      )}
    </div>
  );

  if (props.mode === "currency") {
    const {
      fromCurrency,
      toCurrency,
      currencies,
      ratesLoading,
      ratesError,
      onFromCurrencyChange,
      onToCurrencyChange,
      inputValue,
      onInputValueChange,
      outputValue,
    } = props;

    const currencyOptions = currencies || [];
    const fromOptions = currencyOptions.filter((code) => code === fromCurrency || code !== toCurrency);
    const toOptions = currencyOptions.filter((code) => code === toCurrency || code !== fromCurrency);
    const hasCurrencies = fromOptions.length > 0 && toOptions.length > 0;

    return (
      <div className={styles["display"]} aria-live="polite">
        {renderModeToggle()}
        <div className={styles["statusRow"]}>
          {ratesLoading && <span className={styles["statusMuted"]}>Loading rates…</span>}
          {ratesError && <span className={styles["statusError"]}>{ratesError}</span>}
        </div>
        <div className={styles["currencyRow"]}>
          <select
            className={styles["currencySelect"]}
            value={fromCurrency}
            onChange={(e) => onFromCurrencyChange(e.target.value)}
            disabled={!hasCurrencies || ratesLoading}
          >
            {fromOptions.map((code) => (
              <option key={code} value={code} disabled={code === toCurrency}>
                {code}
              </option>
            ))}
          </select>
          <input
            className={styles["currencyInput"]}
            type="text"
            value={inputValue}
            onChange={(e) => onInputValueChange(e.target.value)}
            inputMode="decimal"
            aria-label="Amount to convert"
            disabled={ratesLoading || !hasCurrencies}
          />
        </div>
        <div className={styles["currencyRow"]}>
          <select
            className={styles["currencySelect"]}
            value={toCurrency}
            onChange={(e) => onToCurrencyChange(e.target.value)}
            disabled={!hasCurrencies || ratesLoading}
          >
            {toOptions.map((code) => (
              <option key={code} value={code} disabled={code === fromCurrency}>
                {code}
              </option>
            ))}
          </select>
          <div className={styles["currencyOutput"]} aria-live="polite">
            {outputValue || (ratesLoading ? "…" : "")}
          </div>
        </div>
      </div>
    );
  }

  // Math mode (default)
  const visibleValue = props.isError ? SPECIAL_VALUES.NAN : props.result ?? props.expression;
  return (
    <div className={styles["display"]} aria-live="polite">
      {renderModeToggle()}
      <div className={styles["history"]}>
        {props.history.length > 0 ? (
          props.history.slice(-3).map((entry, i) => <div key={i}>{entry}</div>)
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
      <div className={styles["result"]}>{visibleValue}</div>
    </div>
  );
}
