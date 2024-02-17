import React from "react";
import { Link } from "react-router-dom";

import styles from "./header.module.scss";

function Header({ showLoginBtn = false }) {
  return (
    <div className={styles.HeaderContainer}>
      <p>
        Talent<span>Bridge</span>.
      </p>

      {showLoginBtn && <Link to="/login">Login</Link>}
    </div>
  );
}

export default Header;
