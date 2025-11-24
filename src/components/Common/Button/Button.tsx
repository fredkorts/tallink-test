import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";

/**
 * Reusable button component with multiple variants
 * Supports primary, secondary, operator, number, clear, and equals button styles
 *
 * Note: This component relies on visible children for accessibility.
 * For icon-only buttons, use IconButton component instead.
 */
type ButtonVariant = "primary" | "secondary" | "operator" | "number" | "clear" | "equals";
type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>["type"];

export interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: ButtonType;
  className?: string;
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  const buttonClass = `${styles["button"]} ${styles[`button--${variant}`]} ${className}`.trim();

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonClass}>
      {children}
    </button>
  );
}

export default Button;
