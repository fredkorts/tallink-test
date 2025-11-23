import styles from "./Layout.module.css";

/**
 * Application header with title and branding
 * Optional component for additional branding/navigation
 */
interface HeaderProps {
  title?: string;
  subtitle?: string;
}

function Header({ title = "Calculator", subtitle }: HeaderProps) {
  return (
    <div className={styles["headerContainer"]}>
      <h1 className={styles["headerTitle"]}>{title}</h1>
      {subtitle && <p className={styles["headerSubtitle"]}>{subtitle}</p>}
    </div>
  );
}

export default Header;
