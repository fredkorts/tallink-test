import { CALCULATOR_MODES, type CalculatorMode } from "../../../../utils/constants";
import ModeToggle from "../../../../components/Common/ModeToggle";
import MathDisplay from "../MathDisplay";
import CurrencyDisplay from "../../../currency/components/CurrencyDisplay";
import type { MathDisplayProps } from "../../types/calculator.types";
import type { CurrencyDisplayProps } from "../../../currency/types/currency.types";
import styles from "./Display.module.css";

type BaseDisplayProps = {
  onModeChange: (mode: CalculatorMode) => void;
};

type ExtendedMathDisplayProps = MathDisplayProps & BaseDisplayProps & {
  mode: "math";
};

type ExtendedCurrencyDisplayProps = CurrencyDisplayProps & BaseDisplayProps & {
  mode: "currency";
};

export type DisplayProps = ExtendedMathDisplayProps | ExtendedCurrencyDisplayProps;

/**
 * Display component router
 * Renders mode toggle and delegates to mode-specific display component
 */
export default function Display(props: DisplayProps) {
  return (
    <div className={styles["display"]} aria-live="polite">
      <ModeToggle mode={props.mode} onModeChange={props.onModeChange} />

      {props.mode === CALCULATOR_MODES.MATH ? (
        <MathDisplay
          expression={props.expression}
          result={props.result}
          history={props.history}
          isError={props.isError}
        />
      ) : (
        <CurrencyDisplay
          fromCurrency={props.fromCurrency}
          toCurrency={props.toCurrency}
          currencies={props.currencies}
          ratesLoading={props.ratesLoading}
          ratesError={props.ratesError}
          onFromCurrencyChange={props.onFromCurrencyChange}
          onToCurrencyChange={props.onToCurrencyChange}
          inputValue={props.inputValue}
          onInputValueChange={props.onInputValueChange}
          outputValue={props.outputValue}
          timestamp={props.timestamp}
        />
      )}
    </div>
  );
}
