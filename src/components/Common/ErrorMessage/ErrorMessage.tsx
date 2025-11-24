import styles from "./ErrorMessage.module.css";

/**
 * Error message component for displaying errors, warnings, and info messages
 * Supports different severity levels with appropriate styling
 */
type ErrorMessageType = "error" | "warning" | "info";

interface ErrorMessageProps {
  message?: string;
  title?: string;
  type?: ErrorMessageType;
  className?: string;
}

function ErrorMessage({ message, title, type = "error", className = "" }: ErrorMessageProps) {
  if (!message) return null;

  const messageClass = `${styles["errorMessage"]} ${styles[`errorMessage--${type}`]} ${className}`.trim();

  return (
    <div className={messageClass} role="alert">
      {title && <p className={styles["errorMessage__title"]}>{title}</p>}
      <p className={styles["errorMessage__text"]}>{message}</p>
    </div>
  );
}

export default ErrorMessage;
