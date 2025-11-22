import React from "react";
import PropTypes from "prop-types";
import styles from "./Layout.module.css";

/**
 * Application header with title and branding
 * Optional component for additional branding/navigation
 */
function Header({ title = "Calculator", subtitle }) {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.headerTitle}>{title}</h1>
      {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Header;
