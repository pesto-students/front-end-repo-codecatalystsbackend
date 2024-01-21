import React from "react";

import styles from "./header.module.scss";

function Header() {
  return (
    <div className={styles.HeaderContainer}>
      <p>
        Talent<span>Bridge</span>.
      </p>
    </div>
  );
}

export default Header;
