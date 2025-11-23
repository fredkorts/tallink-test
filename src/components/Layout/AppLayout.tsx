import type { ReactNode } from "react";
import ModeToggle from "./ModeToggle";
import { MODE_LABELS, type CalculatorMode } from "../../utils/constants";
import styles from "./Layout.module.css";

/**
 * Main application layout wrapper
 * Provides structure for header, mode toggle, and content area
 */
interface AppLayoutProps {
  mode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
  children: ReactNode;
}

function AppLayout({ mode, onModeChange, children }: AppLayoutProps) {
  const modeLabel = MODE_LABELS[mode] || mode;

  return (
    <div className={`${styles["appLayout"]} app-layout`}>
      <header className={styles["header"]}>
        <h1 className={styles["title"]}>Calculator</h1>
        <ModeToggle mode={mode} onModeChange={onModeChange} />
      </header>

      <main className={styles["content"]}>{children}</main>

      <footer className={styles["footer"]}>
        <p className={styles["footerText"]}>Mode: {modeLabel}</p>
      </footer>
    </div>
  );
}

export default AppLayout;
