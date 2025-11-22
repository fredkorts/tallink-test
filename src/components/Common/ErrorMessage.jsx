import React from "react";
import PropTypes from "prop-types";
import styles from "./Common.module.css";

/**
 * Error message component for displaying errors, warnings, and info messages
 * Supports different severity levels with appropriate styling
 */
function ErrorMessage({ message, title, type = "error", className = "" }) {
  if (!message) return null;

  const messageClass =
    `${styles.errorMessage} ${styles[`errorMessage--${type}`]} ${className}`.trim();

  return (
    <div className={messageClass} role="alert">
      {title && <p className={styles.errorMessage__title}>{title}</p>}
      <p className={styles.errorMessage__text}>{message}</p>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf(["error", "warning", "info"]),
  className: PropTypes.string,
};

export default ErrorMessage;
