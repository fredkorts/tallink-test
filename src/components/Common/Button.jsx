import React from "react";
import PropTypes from "prop-types";
import styles from "./Common.module.css";

/**
 * Reusable button component with multiple variants
 * Supports primary, secondary, operator, number, clear, and equals button styles
 *
 * Note: This component relies on visible children for accessibility.
 * For icon-only buttons, use IconButton component instead.
 */
function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
}) {
  const buttonClass = `${styles.button} ${styles[`button--${variant}`]} ${className}`.trim();

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonClass}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "operator", "number", "clear", "equals"]),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
};

export default Button;
