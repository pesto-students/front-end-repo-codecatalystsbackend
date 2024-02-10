import React, { useContext } from "react";

import BadgeImage from "../../assets/pngs/Badge.png";
import styles from "./interviewresult.module.scss";
import { AppContext } from "../../context/AppContext";
import { Navigate, useParams } from "react-router-dom";

function InterviewResult() {
  const { getResultsById } = useContext(AppContext);
  const { id } = useParams();
  const result = getResultsById(id);
  if (!result?.category) {
    return <Navigate to="/" replace />;
  }
  const title = result.category;
  const scoredPercentage = (result.correctAnswer / result.totalQuestions) * 100;
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
            <p>You scored {scoredPercentage}%</p>
            <p>
              Correct Answer: {result.correctAnswer}/{result.totalQuestions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewResult;
