import React, { useContext } from "react";

import styles from "./interviewquestions.module.scss";
import { AppContext } from "../../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";
import Counter from "../Counter/Counter";

function InterviewQuestions() {
  const navigate = useNavigate();
  const {
    interviewQuestions: { questions = [], category },
  } = useContext(AppContext);

  if (questions.length <= 0) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className={styles.interviewQuestionsContainer}>
      <div className={styles.header}>
        <p>Questions</p>
      </div>
      <div className={styles.counterContainer}>
        <Counter />
      </div>
      <div className={styles.questionsContainer}>
        <h3>{category}</h3>
        <div className={styles.questions}>
          {questions.map((questionObj, index) => (
            <div
              key={index}
              onClick={() => navigate(`/interview/${questionObj._id}`)}
            >
              <p>
                {index + 1}. {questionObj.question}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewQuestions;
