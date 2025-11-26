import type { ButtonHTMLAttributes, MouseEvent, MouseEventHandler, ReactNode } from "react";
import { useRef } from "react";
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
type ButtonSize = "default" | "compact";

export interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: ButtonType;
  className?: string;
  size?: ButtonSize;
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
  size = "default",
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    // Remove any existing ripples
    const existingRipples = button.getElementsByClassName(styles["ripple"] ?? "");
    Array.from(existingRipples).forEach((ripple) => ripple.remove());

    // Create ripple element
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    const rippleClass = styles["ripple"];
    if (rippleClass) {
      ripple.classList.add(rippleClass);
    }

    button.appendChild(ripple);

    // Remove ripple after animation completes
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    onClick?.(event);
  };

  const sizeClass = size === "compact" ? styles["button--compact"] : "";
  const buttonClass = `${styles["button"]} ${styles[`button--${variant}`]} ${sizeClass} ${className}`.trim();

  return (
    <button type={type} onClick={handleClick} disabled={disabled} className={buttonClass} ref={buttonRef}>
      {children}
    </button>
  );
}

export default Button;
