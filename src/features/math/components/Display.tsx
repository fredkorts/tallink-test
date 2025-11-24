import { SPECIAL_VALUES } from "../../../utils/constants";
import styles from "./Display.module.css";

interface DisplayProps {
  expression: string;
  result: string | null;
  history: string[];
  isError?: boolean;
}

export default function Display({ expression, result, history, isError }: DisplayProps) {
  const visibleValue = isError ? SPECIAL_VALUES.NAN : result ?? expression;

  return (
    <div className={styles["display"]} aria-live="polite">
      <div className={styles["history"]}>
        {history.length > 0 ? (
          history.slice(-5).map((entry, i) => <div key={i}>{entry}</div>)
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
      <div className={styles["result"]}>{visibleValue}</div>
    </div>
  );
}
