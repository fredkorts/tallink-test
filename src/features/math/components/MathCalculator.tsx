import Display from "./Display.tsx";
import Keypad from "./Keypad.tsx";
import { useCalculator } from '../hooks/useCalculator';
// import HistoryPanel from "./HistoryPanel"; // (optional/future)

/**
 * Main container for Math Calculator mode
 * Renders the display, keypad, and (optionally) history panel
 */
export default function MathCalculator() {
  const {
    currentInput,
    operator,
    firstOperand,
    result,
    history,
    isError,
    handleNumberInput,
    handleDecimalInput,
    handleOperatorInput,
    handleEquals,
    handleClear,
    handleBackspace,
  } = useCalculator();

  return (
    <div className="math-calculator">
      <Display
        currentInput={currentInput}
        operator={operator}
        firstOperand={firstOperand}
        result={result}
        history={history}
        isError={isError}
      />
      {/* <HistoryPanel /> */}
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
