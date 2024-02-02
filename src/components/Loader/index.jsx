import React from "react";

import styles from "./loader.module.scss";

function Loader({ loaderText }) {
  return (
    <div className={styles.loaderContainer}>
      <span class={styles.loader}></span>
      {!!loaderText && <p>{loaderText}</p>}
    </div>
  );
}

export default Loader;
