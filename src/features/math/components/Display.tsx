/**
 * Calculator display screen
 * Shows current calculation, previous operations, and result
 *
 * Props will be added when state is integrated
 */
interface DisplayProps {
  currentInput: string;
  operator: string | null;
  firstOperand: string | null;
  result: number | null | 'Error' | 'NaN' | 'Infinity';
  history: string[];
  isError?: boolean;
  errorType?: 'NaN' | 'Infinity' | null;
}

export default function Display({ currentInput, operator, firstOperand, result, history, isError, errorType }: DisplayProps) {
  return (
    <div className="calculator-display">
      <div className="display-history">
        {history.length > 0 ? history.slice(-5).map((entry, i) => (
          <div key={i}>{entry}</div>
        )) : <span>&nbsp;</span>}
      </div>
      <div className="display-result">
        {isError ? (
          <span className="display-error">{errorType === 'NaN' ? 'NaN' : errorType === 'Infinity' ? '∞' : 'Error'}</span>
        ) : result !== null ? result : (operator && firstOperand !== null ? `${firstOperand}${operator}${currentInput}` : currentInput)}
      </div>
    </div>
  );
}
