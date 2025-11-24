import { useEffect, useState } from "react";
import { useCalculator, type Operator } from "../hooks/useCalculator";
import useHistory from "../hooks/useHistory";
import { OPERATIONS } from "../../../utils/constants";
import styles from "./MathCalculator.module.css";
import CalculatorLayout from "./CalculatorLayout";

export default function MathCalculator() {
  // Mode state: 'math' or 'currency'
  const [mode, setMode] = useState<'math' | 'currency'>('math');

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

  // Currency mode state
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  // Example conversion logic (replace with real API/service)
  useEffect(() => {
    if (mode === 'currency') {
      // Simple mock: 1 USD = 1.1865 EUR
      const rate = 1.1865;
      const val = parseFloat(inputValue);
      if (!isNaN(val)) {
        setOutputValue((val * rate).toLocaleString(undefined, { maximumFractionDigits: 4 }));
      } else {
        setOutputValue('');
      }
    }
  }, [inputValue, fromCurrency, toCurrency, mode]);

  // Math history effect
  useEffect(() => {
    if (mode === 'math' && lastEntry) {
      addHistoryEntry(lastEntry);
    }
  }, [addHistoryEntry, lastEntry, mode]);

  // Keyboard handler (math mode only)
  useEffect(() => {
    if (mode !== 'math') return;
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
  }, [handleBackspace, handleClear, handleDecimalInput, handleEquals, handleNumberInput, handleOperatorInput, mode]);

  // Layout props
  const displayProps = mode === 'math'
    ? { mode: 'math', expression, result, history, isError }
    : {
        mode: 'currency',
        fromCurrency,
        toCurrency,
        onFromCurrencyChange: setFromCurrency,
        onToCurrencyChange: setToCurrency,
        inputValue,
        onInputValueChange: setInputValue,
        outputValue,
      };
  const keypadProps = mode === 'math'
    ? {
        mode: 'math',
        onNumber: handleNumberInput,
        onDecimal: handleDecimalInput,
        onOperator: handleOperatorInput,
        onEquals: handleEquals,
        onClear: handleClear,
        onBackspace: handleBackspace,
      }
    : {
        mode: 'currency',
        onNumber: (digit: string) => setInputValue(val => val + digit),
        onDecimal: () => setInputValue(val => (val.includes('.') ? val : val + '.')),
        onOperator: () => {},
        onEquals: () => {},
        onClear: () => setInputValue(''),
        onBackspace: () => setInputValue(val => val.slice(0, -1)),
      };

  // Mode switcher UI (for demonstration)
  return (
    <div className={styles["wrapper"]}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <button onClick={() => setMode('math')} disabled={mode === 'math'}>Calculator</button>
        <button onClick={() => setMode('currency')} disabled={mode === 'currency'}>Exchange Rate</button>
      </div>
      <CalculatorLayout mode={mode} displayProps={displayProps} keypadProps={keypadProps} />
    </div>
  );
}
