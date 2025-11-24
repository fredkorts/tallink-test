import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import styles from "./IconButton.module.css";

/**
 * Button component with icon support
 * Can display icon only or icon with text
 *
 * IMPORTANT: When iconOnly is true, ariaLabel is REQUIRED for accessibility.
 * Icon-only buttons must have a descriptive label for screen readers.
 */
type IconButtonVariant = "default" | "primary" | "secondary";
type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>["type"];

export interface IconButtonProps {
  children?: ReactNode;
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: IconButtonVariant;
  iconOnly?: boolean;
  disabled?: boolean;
  type?: ButtonType;
  ariaLabel?: string;
  className?: string;
}

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
}: IconButtonProps) {
  // Runtime validation for accessibility
  if (iconOnly && !ariaLabel) {
    console.error(
      "IconButton: ariaLabel is required when iconOnly is true. " +
        "Icon-only buttons must have a descriptive label for screen readers.",
    );
  }

  const buttonClass = `${styles["iconButton"]} ${
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
      {icon && <span className={styles["iconButton__icon"]}>{icon}</span>}
      {!iconOnly && children}
    </button>
  );
}

export default IconButton;
