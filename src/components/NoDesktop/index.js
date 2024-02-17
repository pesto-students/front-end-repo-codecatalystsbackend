import React from "react";

import styles from "./nodesktop.module.scss";

function NoDesktop() {
  return (
    <div className={styles.noDesktopContainer}>
      <div className={styles.noDesktop}>
        <h1>Our App Only supports Desktop mode.</h1>
      </div>
    </div>
  );
}

export default NoDesktop;
