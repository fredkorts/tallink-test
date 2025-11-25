import { useEffect } from "react";
import { useCalculator } from "../../hooks/useCalculator";
import { useKeyboardHandler } from "../../hooks/useKeyboardHandler";
import useHistory from "../../hooks/useHistory";
import CalculatorLayout from "../CalculatorLayout";
import type { KeypadProps, MathCalculatorProps } from "../../types/calculator.types";
import styles from "./MathCalculator.module.css";

/**
 * Math Calculator Component
 * Handles math mode calculations and keyboard input
 */
export default function MathCalculator({ mode, onModeChange }: MathCalculatorProps) {
  // Calculator state and handlers
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

  // History management
  const { history, addHistoryEntry } = useHistory();

  // Keyboard event handling (only active in math mode)
  useKeyboardHandler(
    {
      handleNumberInput,
      handleDecimalInput,
      handleOperatorInput,
      handleEquals,
      handleBackspace,
      handleClear,
    },
    true // enabled
  );

  // Add to history when calculation completes
  useEffect(() => {
    if (lastEntry) {
      addHistoryEntry(lastEntry);
    }
  }, [addHistoryEntry, lastEntry]);

  // Display props
  const displayProps = {
    mode: "math" as const,
    onModeChange,
    expression,
    result,
    history,
    isError,
  };

  // Keypad props
  const keypadProps: KeypadProps = {
    onNumber: handleNumberInput,
    onDecimal: handleDecimalInput,
    onOperator: handleOperatorInput,
    onEquals: handleEquals,
    onClear: handleClear,
    onBackspace: handleBackspace,
    mode,
  };

  return (
    <div className={styles["wrapper"]}>
      <CalculatorLayout displayProps={displayProps} keypadProps={keypadProps} />
    </div>
  );
}
