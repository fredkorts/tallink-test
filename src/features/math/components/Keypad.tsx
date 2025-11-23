/**
 * Calculator keypad
 * Renders number, operator, clear, backspace, prime, and equals buttons
 *
 * Props and handlers will be added when state is integrated
 */
import type { Operator } from '../hooks/useCalculator';
interface KeypadProps {
  onNumber: (digit: string) => void;
  onDecimal: () => void;
  onOperator: (op: Operator) => void;
  onEquals: () => void;
  onClear: () => void;
  onBackspace: () => void;
}

export default function Keypad({ onNumber, onDecimal, onOperator, onEquals, onClear, onBackspace }: KeypadProps) {
  return (
    <div className="calculator-keypad">
      <div className="keypad-row">
        <button className="keypad-btn keypad-btn--clear" aria-label="Clear" onClick={onClear}>C</button>
        <button className="keypad-btn keypad-btn--backspace" aria-label="Backspace" onClick={onBackspace}>&#9003;</button>
        <button className="keypad-btn keypad-btn--prime" aria-label="Prime" onClick={() => onOperator('P')}>P</button>
        <button className="keypad-btn keypad-btn--operator" aria-label="Divide" onClick={() => onOperator('÷')}>÷</button>
      </div>
      <div className="keypad-row">
        <button className="keypad-btn" onClick={() => onNumber('7')}>7</button>
        <button className="keypad-btn" onClick={() => onNumber('8')}>8</button>
        <button className="keypad-btn" onClick={() => onNumber('9')}>9</button>
        <button className="keypad-btn keypad-btn--operator" aria-label="Multiply" onClick={() => onOperator('×')}>×</button>
      </div>
      <div className="keypad-row">
        <button className="keypad-btn" onClick={() => onNumber('4')}>4</button>
        <button className="keypad-btn" onClick={() => onNumber('5')}>5</button>
        <button className="keypad-btn" onClick={() => onNumber('6')}>6</button>
        <button className="keypad-btn keypad-btn--operator" aria-label="Subtract" onClick={() => onOperator('-')}>-</button>
      </div>
      <div className="keypad-row">
        <button className="keypad-btn" onClick={() => onNumber('1')}>1</button>
        <button className="keypad-btn" onClick={() => onNumber('2')}>2</button>
        <button className="keypad-btn" onClick={() => onNumber('3')}>3</button>
        <button className="keypad-btn keypad-btn--operator" aria-label="Add" onClick={() => onOperator('+')}>+</button>
      </div>
      <div className="keypad-row">
        <button className="keypad-btn" onClick={() => onNumber('0')}>0</button>
        <button className="keypad-btn" onClick={onDecimal}>.</button>
        <button className="keypad-btn keypad-btn--equals" aria-label="Equals" onClick={onEquals}>=</button>
      </div>
    </div>
  );
}
