import styles from "./LoadingSpinner.module.css";

/**
 * Loading spinner component with size variants
 * Shows a rotating spinner to indicate loading state
 */
type LoadingSpinnerSize = "small" | "medium" | "large";

interface LoadingSpinnerProps {
  size?: LoadingSpinnerSize;
  className?: string;
}

function LoadingSpinner({ size = "medium", className = "" }: LoadingSpinnerProps) {
  const containerClass = `${styles["spinnerContainer"]} ${styles[`spinnerContainer--${size}`]} ${className}`.trim();

  return (
    <div className={containerClass}>
      <div className={styles["spinner"]} role="status" aria-label="Loading" />
    </div>
  );
}

export default LoadingSpinner;
