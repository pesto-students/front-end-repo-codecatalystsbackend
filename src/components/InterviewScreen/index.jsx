import React, { useEffect, useState } from "react";

import styles from "./interviewscreen.module.scss";
import { Link } from "react-router-dom";

function InterviewScreen() {
  const title = "ReactJS";
  const question = "What is ReactJS?";
  const options = [
    "JavaScript XML",
    "JSX is not an asyncronous",
    "JSON Exchange",
    "JavaScript Extensions",
  ];
  return (
    <div className={styles.interviewScreenContainer}>
      <div style={{ width: "100%" }}>
        <h2>{title}</h2>
        <div className={styles.questionsContainer}>
          <div className={styles.questionsBox}>
            <p className={styles.question}>{question}</p>
            <OptionsList list={options} />
          </div>
          <QuestionController />
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <div>
          <Link to="/questions">View all Questions List</Link>
        </div>
        <div>
          <Link to="/">Submit</Link>
        </div>
      </div>
    </div>
  );
}

const OptionsList = ({ list }) => {
  const [currentSelected, setCurrentSelected] = useState("");
  if (!Array.isArray(list) || list.length <= 0) {
    return <></>;
  }
  let renderList = list
    .reduce(
      (acc, eList, index) => {
        if (index >= 2) {
          acc[0].push(eList);
        } else {
          acc[1].push(eList);
        }
        return acc;
      },
      [[], []]
    )
    .reverse();
  return (
    <div className={styles.optionsListContainer}>
      {renderList.length > 0 &&
        renderList.map((eList, index) => {
          if (Array.isArray(eList) && eList.length > 0) {
            return (
              <div key={index} className={styles.eachOptionListContainer}>
                {eList.map((eOption, iIndex) => (
                  <div
                    key={`${index}-${iIndex}`}
                    style={{
                      backgroundColor:
                        currentSelected === eOption
                          ? "#4bb543"
                          : "rgba(255, 255, 255, 0.3)",
                    }}
                    onClick={() => setCurrentSelected(eOption)}
                  >
                    <p>{eOption}</p>
                  </div>
                ))}
              </div>
            );
          }
        })}
    </div>
  );
};

const QuestionController = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div className={styles.questionControllerContainer}>
        <button>Previous</button>
        <Counter numOfSeconds={6} onTimeup={() => alert("time up")} />
        <button>Next</button>
      </div>
    </div>
  );
};

const Counter = ({ numOfSeconds, onTimeup = () => {} }) => {
  const [currentTime, setCurrentTime] = useState(numOfSeconds);
  useEffect(() => {
    if (currentTime > 0) {
      setTimeout(() => {
        setCurrentTime((pv) => pv - 1);
      }, 1000);
    } else {
      onTimeup();
    }
  }, [currentTime]);
  return <div className={styles.counter}>{currentTime}</div>;
};

export default InterviewScreen;
