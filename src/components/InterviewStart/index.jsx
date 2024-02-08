import React from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import styles from "./interviewstart.module.scss";
import { createInterview } from "../../apis/interviewApis";

function InterviewStart() {
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedSkill = queryParams.get("skill");
  const userSkills = user.skills || [];
  const instructions = [
    "Each questions have 4 Options",
    "You can skip any questions for answer latter",
    "Timing - You need to complete each of your attempts in one sitting, as you are allotted 30 minutes to each attempt.",
  ];

  const handleStart = async () => {
    const e = document.getElementById("interviewCategoryOptions");
    const value = e.options[e.selectedIndex].value;
    if (!value) {
      return alert("Please select a category");
    }
    const res = await createInterview(user.id, value);
  };

  return (
    <div className={styles.interviewStartContainer}>
      <div className={styles.upperContainer}>
        <div className={styles.skillsDropdown}>
          <p>Select Skill</p>
          <div className={styles.dropdown}>
            <select
              className={styles.dropdownSelect}
              id="interviewCategoryOptions"
            >
              <option value="">Select</option>
              {userSkills.length > 0 &&
                userSkills.map((skill, index) => {
                  return (
                    <option
                      value={skill}
                      key={index}
                      selected={selectedSkill === skill ? "selected" : ""}
                    >
                      {skill}
                    </option>
                  );
                })}
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
        <button onClick={handleStart}>Start</button>
      </div>
    </div>
  );
}

export default InterviewStart;
