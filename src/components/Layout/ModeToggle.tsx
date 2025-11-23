import { CALCULATOR_MODES, type CalculatorMode } from "../../utils/constants";
import styles from "./Layout.module.css";

/**
 * Toggle switch for Math/Currency mode
 * Allows user to switch between calculator modes
 */
interface ModeToggleProps {
  mode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
}

function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  const handleToggle = () => {
    const newMode = mode === CALCULATOR_MODES.MATH ? CALCULATOR_MODES.CURRENCY : CALCULATOR_MODES.MATH;
    onModeChange(newMode);
  };

  const isMathMode = mode === CALCULATOR_MODES.MATH;

  return (
    <div className={styles["modeToggle"]}>
      <button
        type="button"
        onClick={handleToggle}
        className={styles["toggleButton"]}
        aria-label={`Switch to ${isMathMode ? "Currency" : "Math"} mode`}
      >
        <span className={`${styles["toggleOption"]} ${isMathMode ? styles["active"] : ""}`}>Math</span>
        <span className={`${styles["toggleOption"]} ${!isMathMode ? styles["active"] : ""}`}>
          Currency
        </span>
        <span className={styles["toggleSlider"]} data-active={isMathMode ? "math" : "currency"} />
      </button>
    </div>
  );
}

export default ModeToggle;
