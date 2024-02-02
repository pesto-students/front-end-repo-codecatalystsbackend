import React from "react";

import styles from "./header.module.scss";

function Header({showLoginBtn = false, btnStyle = {}}) {
  return (
    <div className={styles.HeaderContainer}>
      <p>
        Talent<span>Bridge</span>.
      </p>

      {showLoginBtn && (
        <button style={{...btnStyle}}>Login</button>
      )}
    </div>
  );
}

export default Header;
