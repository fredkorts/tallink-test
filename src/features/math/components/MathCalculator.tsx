import { useEffect } from "react";
import Display from "./Display.tsx";
import Keypad from "./Keypad.tsx";
import { useCalculator, type Operator } from "../hooks/useCalculator";
import useHistory from "../hooks/useHistory";
import { OPERATIONS } from "../../../utils/constants";
import styles from "./MathCalculator.module.css";

export default function MathCalculator() {
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

  useEffect(() => {
    if (lastEntry) {
      addHistoryEntry(lastEntry);
    }
  }, [addHistoryEntry, lastEntry]);

  useEffect(() => {
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
  }, [handleBackspace, handleClear, handleDecimalInput, handleEquals, handleNumberInput, handleOperatorInput]);

  return (
    <div className={styles["wrapper"]}>
      <Display expression={expression} result={result} history={history} isError={isError} />
      {/* <HistoryPanel history={history} /> */}
      <Keypad
        onNumber={handleNumberInput}
        onDecimal={handleDecimalInput}
        onOperator={handleOperatorInput}
        onEquals={handleEquals}
        onClear={handleClear}
        onBackspace={handleBackspace}
      />
    </div>
  );
}
