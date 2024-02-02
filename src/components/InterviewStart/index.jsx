import React from "react";
import { useParams } from "react-router-dom";

import styles from "./interviewstart.module.scss";

function InterviewStart() {
  const params = useParams()
  console.log(params)
  const instructions = [
    "Each questions have 4 Options",
    "You can skip any questions for answer latter",
    "Timing - You need to complete each of your attempts in one sitting, as you are allotted 30 minutes to each attempt.",
  ];
  return (
    <div className={styles.interviewStartContainer}>
      <div className={styles.upperContainer}>
        <div className={styles.skillsDropdown}>
          <p>Select Skill</p>
          <div className={styles.dropdown}>
            <select className={styles.dropdownSelect}>
              <option value="">Select</option>
              <option value="react">React JS</option>
              <option value="node">Node 15</option>
              <option value="python">Python</option>
            </select>
          </div>
        </div>
        <div className={styles.intructionsContainer}>
          <h2>Instructions:</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {instructions.map((intr, index) => (
              <p key={index}>{`${index + 1}. ${intr}`}</p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.lowerContainer}>
        <button>Start</button>
      </div>
    </div>
  );
}

export default InterviewStart;
