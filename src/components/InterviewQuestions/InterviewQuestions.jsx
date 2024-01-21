import React from "react";

import styles from "./interviewquestions.module.scss";

function InterviewQuestions() {
  const title = "ReactJS";
  const questions = [
    "What is a component in React?",
    "How do you create a state in a React class component?",
    "What is the purpose of props in React?",
    "What is the role of virtual DOM in React?",
  ];
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
