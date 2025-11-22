import React from "react";
import PropTypes from "prop-types";
import styles from "./Common.module.css";

/**
 * Loading spinner component with size variants
 * Shows a rotating spinner to indicate loading state
 */
function LoadingSpinner({ size = "medium", className = "" }) {
  const containerClass =
    `${styles.spinnerContainer} ${styles[`spinnerContainer--${size}`]} ${className}`.trim();

  return (
    <div className={containerClass}>
      <div className={styles.spinner} role="status" aria-label="Loading" />
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
};

export default LoadingSpinner;
