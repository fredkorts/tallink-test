interface CurrencyKeypadProps {
  onInput: (value: string) => void;
  onClear: () => void;
  onBackspace: () => void;
}

export default function CurrencyKeypad({ onInput, onClear, onBackspace }: CurrencyKeypadProps) {
  const digits = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0", "."],
  ];

  return (
    <div className="currency-keypad" aria-label="Currency keypad">
      <div className="keypad-row">
        <button className="keypad-btn keypad-btn--clear" onClick={onClear} aria-label="Clear amount">
          C
        </button>
        <button className="keypad-btn keypad-btn--backspace" onClick={onBackspace} aria-label="Delete last digit">
          &#9003;
        </button>
      </div>
      {digits.map((row) => (
        <div className="keypad-row" key={row.join("-")}>
          {row.map((digit) => (
            <button
              key={digit}
              className="keypad-btn"
              onClick={() => onInput(digit)}
              aria-label={`Add ${digit}`}
            >
              {digit}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
