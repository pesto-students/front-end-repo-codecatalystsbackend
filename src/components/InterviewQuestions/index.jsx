import React, { useContext } from "react";

import styles from "./interviewquestions.module.scss";
import { AppContext } from "../../context/AppContext";
import { Navigate } from "react-router-dom";

function InterviewQuestions() {
  const { getAllInterviewQuestions } = useContext(AppContext);
  const title = "ReactJS";
  const questions = getAllInterviewQuestions() || [];
  console.log(questions, "qustins");

  if (questions.length <= 0) {
    return <Navigate tp="/" replace={true} />;
  }
  return (
    <div className={styles.interviewQuestionsContainer}>
      <div className={styles.header}>
        <p>Questions</p>
      </div>
      <div className={styles.questionsContainer}>
        <h3>{title}</h3>
        <div className={styles.questions}>
          {questions.map((question, index) => (
            <div key={index}>
              <p>
                {index + 1}. {question}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewQuestions;
