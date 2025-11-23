import React from "react";
import PropTypes from "prop-types";
import ModeToggle from "./ModeToggle";
import { CALCULATOR_MODES, MODE_LABELS } from "../../utils/constants";
import styles from "./Layout.module.css";

/**
 * Main application layout wrapper
 * Provides structure for header, mode toggle, and content area
 */
function AppLayout({ mode, onModeChange, children }) {
  const modeLabel = MODE_LABELS[mode] || mode;

  return (
    <div className={`${styles.appLayout} app-layout`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Calculator</h1>
        <ModeToggle mode={mode} onModeChange={onModeChange} />
      </header>

      <main className={styles.content}>{children}</main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>Mode: {modeLabel}</p>
      </footer>
    </div>
  );
}

AppLayout.propTypes = {
  mode: PropTypes.oneOf(Object.values(CALCULATOR_MODES)).isRequired,
  onModeChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppLayout;
