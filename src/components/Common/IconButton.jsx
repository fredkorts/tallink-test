import React from "react";
import PropTypes from "prop-types";
import styles from "./Common.module.css";

/**
 * Button component with icon support
 * Can display icon only or icon with text
 *
 * IMPORTANT: When iconOnly is true, ariaLabel is REQUIRED for accessibility.
 * Icon-only buttons must have a descriptive label for screen readers.
 */
function IconButton({
  children,
  icon,
  onClick,
  variant = "default",
  iconOnly = false,
  disabled = false,
  type = "button",
  ariaLabel,
  className = "",
}) {
  // Runtime validation for accessibility
  if (iconOnly && !ariaLabel) {
    console.error(
      "IconButton: ariaLabel is required when iconOnly is true. " +
        "Icon-only buttons must have a descriptive label for screen readers.",
    );
  }

  const buttonClass = `${styles.iconButton} ${
    variant !== "default" ? styles[`iconButton--${variant}`] : ""
  } ${iconOnly ? styles["iconButton--icon-only"] : ""} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      aria-label={ariaLabel}
    >
      {icon && <span className={styles.iconButton__icon}>{icon}</span>}
      {!iconOnly && children}
    </button>
  );
}

IconButton.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["default", "primary", "secondary"]),
  iconOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  ariaLabel: function (props, propName, componentName) {
    if (props.iconOnly && !props[propName]) {
      return new Error(
        `The prop \`${propName}\` is required when \`iconOnly\` is true in \`${componentName}\`. ` +
          "Icon-only buttons must have a descriptive label for screen readers.",
      );
    }
    if (props[propName] && typeof props[propName] !== "string") {
      return new Error(
        `Invalid prop \`${propName}\` of type \`${typeof props[propName]}\` supplied to \`${componentName}\`, expected \`string\`.`,
      );
    }
  },
  className: PropTypes.string,
};

export default IconButton;
