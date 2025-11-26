import { CALCULATOR_MODES, OPERATIONS, type CalculatorMode } from "../../../../utils/constants";
import type { Operator } from "../../hooks/useCalculator";
import Button from "../../../../components/Common/Button/Button";
import type { ButtonProps } from "../../../../components/Common/Button/Button";
import styles from "./Keypad.module.css";

type KeyButton = {
  label: string;
  ariaLabel?: string;
  variant?: ButtonProps["variant"];
  className?: string;
  onClick: () => void;
};

export interface KeypadProps {
  onNumber: (digit: string) => void;
  onDecimal: () => void;
  onOperator: (op: Operator) => void;
  onEquals: () => void;
  onClear: () => void;
  onBackspace: () => void;
  mode?: CalculatorMode;
}

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
    variant: "number",
    onClick: () => onNumber(digit),
  });

  const mathRows: KeyButton[][] = [
    [
      { label: "C", ariaLabel: "Clear", variant: "clear", onClick: onClear },
      { label: "⌫", ariaLabel: "Backspace", variant: "operator", onClick: onBackspace },
      { label: OPERATIONS.PRIME, ariaLabel: "Prime", variant: "operator", onClick: () => onOperator(OPERATIONS.PRIME) },
      { label: OPERATIONS.DIVIDE, ariaLabel: "Divide", variant: "operator", onClick: () => onOperator(OPERATIONS.DIVIDE) },
    ],
    [
      createNumberButton("7"),
      createNumberButton("8"),
      createNumberButton("9"),
      { label: OPERATIONS.MULTIPLY, ariaLabel: "Multiply", variant: "operator", onClick: () => onOperator(OPERATIONS.MULTIPLY) },
    ],
    [
      createNumberButton("4"),
      createNumberButton("5"),
      createNumberButton("6"),
      { label: OPERATIONS.SUBTRACT, ariaLabel: "Subtract", variant: "operator", onClick: () => onOperator(OPERATIONS.SUBTRACT) },
    ],
    [
      createNumberButton("1"),
      createNumberButton("2"),
      createNumberButton("3"),
      { label: OPERATIONS.ADD, ariaLabel: "Add", variant: "operator", onClick: () => onOperator(OPERATIONS.ADD) },
    ],
    [
      createNumberButton("0"),
      { label: ".", variant: "number", onClick: onDecimal },
      { label: "=", ariaLabel: "Equals", variant: "equals", className: styles["equals"], onClick: onEquals },
    ],
  ];

  const currencyRows: KeyButton[][] = [
    [
      { label: "C", ariaLabel: "Clear", variant: "clear", onClick: onClear },
      { label: "⌫", ariaLabel: "Backspace", variant: "operator", onClick: onBackspace },
    ],
    [createNumberButton("7"), createNumberButton("8"), createNumberButton("9")],
    [createNumberButton("4"), createNumberButton("5"), createNumberButton("6")],
    [createNumberButton("1"), createNumberButton("2"), createNumberButton("3")],
    [createNumberButton("00"), createNumberButton("0"), { label: ".", variant: "number", onClick: onDecimal }],
  ];

  const rows = isMath ? mathRows : currencyRows;

  return (
    <div className={styles["keypad"]}>
      {rows.map((row, rowIndex) => (
        <div className={styles["row"]} key={`row-${rowIndex}`}>
          {row.map((button, index) => (
            <Button
              key={`${button.label}-${index}`}
              variant={button.variant}
              className={button.className}
              onClick={button.onClick}
              size="compact"
            >
              {button.label}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
