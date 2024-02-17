import React, { useContext } from "react";

import styles from "./counter.module.scss";
import { AppContext } from "../../context/AppContext";

const Counter = () => {
  const { counter } = useContext(AppContext);
  return (
    <div className={styles.counter}>
      {counter.minutes}:{counter.seconds}
    </div>
  );
};

export default Counter;
