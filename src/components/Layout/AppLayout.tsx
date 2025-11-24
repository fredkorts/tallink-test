import type { ReactNode } from "react";
import ModeToggle from "./ModeToggle";
import { type CalculatorMode } from "../../utils/constants";
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

  return (
    <div className={`container ${styles["appLayout"]}`}>
      <header className={styles["header"]}>
        <h1 className={styles["title"]}>Calculator</h1>
        <div className={styles["modeToggleRegion"]}>
          <ModeToggle mode={mode} onModeChange={onModeChange} />
        </div>
      </header>

      <main className={styles["content"]}>
        <div className={styles["contentCard"]}>{children}</div>
      </main>
    </div>
  );
}

export default AppLayout;
