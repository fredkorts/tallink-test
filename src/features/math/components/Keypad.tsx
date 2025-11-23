/**
 * Calculator keypad
 * Renders number, operator, clear, backspace, prime, and equals buttons
 *
 * Props and handlers will be added when state is integrated
 */
export default function Keypad() {
  // Placeholder layout based on design
  return (
    <div className="calculator-keypad">
      <div className="keypad-row">
        <button className="keypad-btn keypad-btn--clear" aria-label="Clear">C</button>
        <button className="keypad-btn keypad-btn--backspace" aria-label="Backspace">&#9003;</button>
        <button className="keypad-btn keypad-btn--prime" aria-label="Prime">P</button>
        <button className="keypad-btn keypad-btn--operator" aria-label="Divide">÷</button>
      </div>
      <div className="keypad-row">
        <button className="keypad-btn">7</button>
        <button className="keypad-btn">8</button>
        <button className="keypad-btn">9</button>
        <button className="keypad-btn keypad-btn--operator" aria-label="Multiply">×</button>
      </div>
      <div className="keypad-row">
        <button className="keypad-btn">4</button>
        <button className="keypad-btn">5</button>
        <button className="keypad-btn">6</button>
        <button className="keypad-btn keypad-btn--operator" aria-label="Subtract">-</button>
      </div>
      <div className="keypad-row">
        <button className="keypad-btn">1</button>
        <button className="keypad-btn">2</button>
        <button className="keypad-btn">3</button>
        <button className="keypad-btn keypad-btn--operator" aria-label="Add">+</button>
      </div>
      <div className="keypad-row">
        <button className="keypad-btn">0</button>
        <button className="keypad-btn">.</button>
        <button className="keypad-btn keypad-btn--equals" aria-label="Equals">=</button>
      </div>
    </div>
  );
}
