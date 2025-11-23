import Display from "./Display.tsx";
import Keypad from "./Keypad.tsx";
import { useCalculator } from '../hooks/useCalculator';
import HistoryPanel from "./HistoryPanel.jsx";
import useHistory from '../hooks/useHistory';

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
    history: calcHistory,
    isError,
    handleNumberInput,
    handleDecimalInput,
    handleOperatorInput,
    handleEquals,
    handleClear,
    handleBackspace,
  } = useCalculator();
  const { history, addHistoryEntry } = useHistory();

  // Wrap equals to also add to history
  const handleEqualsWithHistory = () => {
    handleEquals();
    // Add the latest entry from calcHistory to persistent history
    setTimeout(() => {
      if (calcHistory.length > 0) {
        const lastEntry = calcHistory[calcHistory.length - 1];
        addHistoryEntry(lastEntry);
      }
    }, 0);
  };

  return (
    <div className="math-calculator">
      <Display
        currentInput={currentInput}
        operator={operator}
        firstOperand={firstOperand}
        result={result}
        history={calcHistory}
        isError={isError}
      />
  <HistoryPanel history={history} onSelect={undefined} />
      <Keypad
        onNumber={handleNumberInput}
        onDecimal={handleDecimalInput}
        onOperator={handleOperatorInput}
        onEquals={handleEqualsWithHistory}
        onClear={handleClear}
        onBackspace={handleBackspace}
      />
    </div>
  );
}
