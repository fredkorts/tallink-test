import { CALCULATOR_MODES, type CalculatorMode } from "../../../utils/constants";
import styles from "./ModeToggle.module.css";

export interface ModeToggleProps {
    mode: CalculatorMode;
    onModeChange: (mode: CalculatorMode) => void;
}

/**
 * Mode toggle component for switching between Calculator and Exchange Rate modes
 */
export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
    return (
        <div className={styles.modeToggle}>
            {mode === CALCULATOR_MODES.MATH ? (
                <span className={styles.modeToggleLabel}>Calculator</span>
            ) : (
                <button
                    type="button"
                    className={styles.modeToggleButton}
                    onClick={() => onModeChange(CALCULATOR_MODES.MATH)}
                >
                    Calculator
                </button>
            )}

            <span className={styles.modeToggleDivider}>|</span>

            {mode === CALCULATOR_MODES.CURRENCY ? (
                <span className={styles.modeToggleLabel}>Exchange Rate</span>
            ) : (
                <button
                    type="button"
                    className={styles.modeToggleButton}
                    onClick={() => onModeChange(CALCULATOR_MODES.CURRENCY)}
                >
                    Exchange Rate
                </button>
            )}
        </div>
    );
}
