/**
 * Calculator keypad
 * Renders number, operator, clear, backspace, prime, and equals buttons
 *
 * Props and handlers will be added when state is integrated
 */
import type { Operator } from "../hooks/useCalculator";
import styles from "./Keypad.module.css";
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
    <div className={styles["keypad"]}>
      <div className={styles["row"]}>
        <button className={`${styles["button"]} ${styles["clear"]}`} aria-label="Clear" onClick={onClear}>
          C
        </button>
        <button
          className={`${styles["button"]} ${styles["backspace"]}`}
          aria-label="Backspace"
          onClick={onBackspace}
        >
          &#9003;
        </button>
        <button className={`${styles["button"]} ${styles["prime"]}`} aria-label="Prime" onClick={() => onOperator("P")}>
          P
        </button>
        <button
          className={`${styles["button"]} ${styles["operator"]}`}
          aria-label="Divide"
          onClick={() => onOperator("÷")}
        >
          ÷
        </button>
      </div>
      <div className={styles["row"]}>
        <button className={styles["button"]} onClick={() => onNumber("7")}>
          7
        </button>
        <button className={styles["button"]} onClick={() => onNumber("8")}>
          8
        </button>
        <button className={styles["button"]} onClick={() => onNumber("9")}>
          9
        </button>
        <button
          className={`${styles["button"]} ${styles["operator"]}`}
          aria-label="Multiply"
          onClick={() => onOperator("×")}
        >
          ×
        </button>
      </div>
      <div className={styles["row"]}>
        <button className={styles["button"]} onClick={() => onNumber("4")}>
          4
        </button>
        <button className={styles["button"]} onClick={() => onNumber("5")}>
          5
        </button>
        <button className={styles["button"]} onClick={() => onNumber("6")}>
          6
        </button>
        <button
          className={`${styles["button"]} ${styles["operator"]}`}
          aria-label="Subtract"
          onClick={() => onOperator("-")}
        >
          -
        </button>
      </div>
      <div className={styles["row"]}>
        <button className={styles["button"]} onClick={() => onNumber("1")}>
          1
        </button>
        <button className={styles["button"]} onClick={() => onNumber("2")}>
          2
        </button>
        <button className={styles["button"]} onClick={() => onNumber("3")}>
          3
        </button>
        <button
          className={`${styles["button"]} ${styles["operator"]}`}
          aria-label="Add"
          onClick={() => onOperator("+")}
        >
          +
        </button>
      </div>
      <div className={styles["row"]}>
        <button className={styles["button"]} onClick={() => onNumber("0")}>
          0
        </button>
        <button className={styles["button"]} onClick={onDecimal}>
          .
        </button>
        <button className={`${styles["button"]} ${styles["equals"]}`} aria-label="Equals" onClick={onEquals}>
          =
        </button>
      </div>
    </div>
  );
}
