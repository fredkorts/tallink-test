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
      <main className={styles["content"]}>
        <div className={styles["contentCard"]}>{children}</div>
      </main>
    </div>
  );
}

export default AppLayout;
