import React from "react";

import styles from "./interviewhistory.module.scss";

function InterviewHistory() {
  const attempts = [
    { title: "ReactJS", date: "01 Jan 2024", score: "8/10" },
    { title: "ReactJS", date: "01 Jan 2024", score: "8/10" },
    { title: "ReactJS", date: "01 Jan 2024", score: "8/10" },
    { title: "ReactJS", date: "01 Jan 2024", score: "8/10" },
  ];
  return (
    <div className={styles.interviewHistoryContainer}>
      <div className={styles.header}>
        <p>Interview History</p>
      </div>
      <div className={styles.historyContainer}>
        <div className={styles.history}>
          <div>
            <p>Title</p>
            <p>Date</p>
            <p>Score</p>
            <p></p>
          </div>
        </div>
        <div className={styles.history}>
          {attempts.map((attempt, index) => (
            <div key={index}>
              <p>
                {index + 1}. {attempt.title}
              </p>
              <p>{attempt.date}</p>
              <p>{attempt.score}</p>
              <button>View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewHistory;
