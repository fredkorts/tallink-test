import type { ReactNode } from "react";
import styles from "./AppLayout.module.css";

/**
 * Main application layout wrapper
 * Provides structure for header and content area
 */
export interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {

  return (
    <div className={`container ${styles["appLayout"]}`}>
      <header className={styles["header"]}>
        <h1 className={styles["title"]}>Calculator</h1>
      </header>

      <main className={styles["content"]}>
        <div className={styles["contentCard"]}>{children}</div>
      </main>
    </div>
  );
}

export default AppLayout;
