import styles from "./CurrencyKeypad.module.css";

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
    <div className={styles["keypad"]} aria-label="Currency keypad">
      <div className={styles["row"]}>
        <button className={`${styles["button"]} ${styles["clear"]}`} onClick={onClear} aria-label="Clear amount">
          C
        </button>
        <button
          className={`${styles["button"]} ${styles["backspace"]}`}
          onClick={onBackspace}
          aria-label="Delete last digit"
        >
          &#9003;
        </button>
      </div>
      {digits.map((row) => (
        <div className={styles["row"]} key={row.join("-")}>
          {row.map((digit) => (
            <button
              key={digit}
              className={styles["button"]}
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
