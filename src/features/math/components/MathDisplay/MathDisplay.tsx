import { SPECIAL_VALUES } from "../../../../utils/constants";
import styles from "./MathDisplay.module.css";

export interface MathDisplayProps {
    expression: string;
    result: string | null;
    history: string[];
    isError: boolean;
}

/**
 * Display component for Math Calculator mode
 * Shows expression, result, and calculation history
 */
export default function MathDisplay({
    expression,
    result,
    history,
    isError,
}: MathDisplayProps) {
    const visibleValue = isError ? SPECIAL_VALUES.NAN : result ?? expression;

    return (
        <div className={styles["mathDisplay"]}>
            <div className={styles["history"]}>
                {history.length > 0 ? (
                    history.slice(-3).map((entry, i) => <div key={i}>{entry}</div>)
                ) : (
                    <span>&nbsp;</span>
                )}
            </div>
            <div className={styles["result"]}>{visibleValue}</div>
        </div>
    );
}
