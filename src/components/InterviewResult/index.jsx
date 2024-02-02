import React from "react";

import BadgeImage from "../../assets/pngs/Badge.png";
import styles from "./interviewresult.module.scss";

function InterviewResult() {
  const title = "ReactJS";
  return (
    <div className={styles.resultContainer}>
      <h3>{title}</h3>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={styles.result}>
          <div>
            <img src={BadgeImage} />
          </div>
          <h4>Congratulations</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>You scored 80%</p>
            <p>Correct Answer: 8/10</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewResult;
