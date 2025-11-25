import { CALCULATOR_MODES, OPERATIONS } from "../../../../utils/constants";
import type { KeypadProps } from "../../types/calculator.types";
import styles from "./Keypad.module.css";

type KeyButton = {
  label: string;
  ariaLabel?: string;
  className?: string;
  onClick: () => void;
};

export default function Keypad({
  onNumber,
  onDecimal,
  onOperator,
  onEquals,
  onClear,
  onBackspace,
  mode = CALCULATOR_MODES.MATH,
}: KeypadProps) {
  const isMath = mode === CALCULATOR_MODES.MATH;

  const createNumberButton = (digit: string): KeyButton => ({
    label: digit,
    onClick: () => onNumber(digit),
  });

  const mathRows: KeyButton[][] = [
    [
      { label: "C", ariaLabel: "Clear", className: styles["clear"], onClick: onClear },
      { label: "⌫", ariaLabel: "Backspace", className: styles["backspace"], onClick: onBackspace },
      { label: OPERATIONS.PRIME, ariaLabel: "Prime", className: styles["prime"], onClick: () => onOperator(OPERATIONS.PRIME) },
      { label: OPERATIONS.DIVIDE, ariaLabel: "Divide", className: styles["operator"], onClick: () => onOperator(OPERATIONS.DIVIDE) },
    ],
    [
      createNumberButton("7"),
      createNumberButton("8"),
      createNumberButton("9"),
      { label: OPERATIONS.MULTIPLY, ariaLabel: "Multiply", className: styles["operator"], onClick: () => onOperator(OPERATIONS.MULTIPLY) },
    ],
    [
      createNumberButton("4"),
      createNumberButton("5"),
      createNumberButton("6"),
      { label: OPERATIONS.SUBTRACT, ariaLabel: "Subtract", className: styles["operator"], onClick: () => onOperator(OPERATIONS.SUBTRACT) },
    ],
    [
      createNumberButton("1"),
      createNumberButton("2"),
      createNumberButton("3"),
      { label: OPERATIONS.ADD, ariaLabel: "Add", className: styles["operator"], onClick: () => onOperator(OPERATIONS.ADD) },
    ],
    [
      createNumberButton("0"),
      { label: ".", onClick: onDecimal },
      { label: "=", ariaLabel: "Equals", className: styles["equals"], onClick: onEquals },
    ],
  ];

  const currencyRows: KeyButton[][] = [
    [
      { label: "C", ariaLabel: "Clear", className: styles["clear"], onClick: onClear },
      { label: "⌫", ariaLabel: "Backspace", className: styles["backspace"], onClick: onBackspace },
    ],
    [createNumberButton("7"), createNumberButton("8"), createNumberButton("9")],
    [createNumberButton("4"), createNumberButton("5"), createNumberButton("6")],
    [createNumberButton("1"), createNumberButton("2"), createNumberButton("3")],
    [createNumberButton("00"), createNumberButton("0"), { label: ".", onClick: onDecimal }],
  ];

  const rows = isMath ? mathRows : currencyRows;

  return (
    <div className={styles["keypad"]}>
      {rows.map((row, rowIndex) => (
        <div className={styles["row"]} key={`row-${rowIndex}`}>
          {row.map((button, index) => {
            const buttonClass = button.className ? `${styles["button"]} ${button.className}` : styles["button"];
            return (
              <button
                key={`${button.label}-${index}`}
                className={buttonClass}
                aria-label={button.ariaLabel}
                onClick={button.onClick}
                type="button"
              >
                {button.label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
