import React from "react";
import PropTypes from "prop-types";
import { CALCULATOR_MODES } from "../../utils/constants";
import styles from "./Layout.module.css";

/**
 * Toggle switch for Math/Currency mode
 * Allows user to switch between calculator modes
 */
function ModeToggle({ mode, onModeChange }) {
  const handleToggle = () => {
    const newMode =
      mode === CALCULATOR_MODES.MATH ? CALCULATOR_MODES.CURRENCY : CALCULATOR_MODES.MATH;
    onModeChange(newMode);
  };

  const isMathMode = mode === CALCULATOR_MODES.MATH;

  return (
    <div className={styles.modeToggle}>
      <button
        type="button"
        onClick={handleToggle}
        className={styles.toggleButton}
        aria-label={`Switch to ${isMathMode ? "Currency" : "Math"} mode`}
      >
        <span className={`${styles.toggleOption} ${isMathMode ? styles.active : ""}`}>Math</span>
        <span className={`${styles.toggleOption} ${!isMathMode ? styles.active : ""}`}>
          Currency
        </span>
        <span className={styles.toggleSlider} data-active={isMathMode ? "math" : "currency"} />
      </button>
    </div>
  );
}

ModeToggle.propTypes = {
  mode: PropTypes.oneOf(Object.values(CALCULATOR_MODES)).isRequired,
  onModeChange: PropTypes.func.isRequired,
};

export default ModeToggle;
