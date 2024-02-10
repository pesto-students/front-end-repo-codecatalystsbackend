import React, { useContext, useEffect, useState } from "react";

import styles from "./interviewscreen.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Counter from "../Counter/Counter";

function InterviewScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const {
    interviewQuestions: { category = "", _id = "", questions = [] },
    getInterviewQuestionById,
    handleInterviewSubmit,
  } = useContext(AppContext);

  const currentQuestion = getInterviewQuestionById(params.id || "");
  if (!_id || questions?.length <= 0 || !currentQuestion) {
    navigate("/");
    return;
  }

  const title = category;
  const question = currentQuestion.question;
  const options = [];
  const obj = Object.entries(currentQuestion.options);
  obj.forEach(
    (option) =>
      option[0] !== "_id" &&
      options.push(`${option[0].toUpperCase()}: ${option[1]}`)
  );
  const questionIndex = questions.findIndex(
    (question) => question._id === params.id
  );
  return (
    <div className={styles.interviewScreenContainer}>
      <div style={{ width: "100%" }}>
        <h2>{title}</h2>
        <div className={styles.questionsContainer}>
          <div className={styles.questionsBox}>
            <p className={styles.question}>
              {questionIndex + 1}: {question}
            </p>
            <OptionsList list={options} questionId={params.id} />
          </div>
          <QuestionController
            currQuesIndex={questionIndex}
            questions={questions}
          />
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <div>
          <Link to="/questions">View all Questions List</Link>
        </div>
        <div>
          <button onClick={handleInterviewSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

const OptionsList = ({ list, questionId }) => {
  const { selectedAnswer, setSelectedAnswer } = useContext(AppContext);

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

  const handleSelect = (eOption) => {
    setSelectedAnswer((pv) => {
      return {
        ...pv,
        [questionId]: {
          answer: eOption.split(":")[0].toLowerCase(),
          option: eOption,
        },
      };
    });
  };
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
                        selectedAnswer[questionId]?.option === eOption
                          ? "#4bb543"
                          : "rgba(255, 255, 255, 0.3)",
                    }}
                    onClick={() => handleSelect(eOption)}
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

const QuestionController = ({ currQuesIndex = 0, questions = [] }) => {
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div className={styles.questionControllerContainer}>
        <button
          disabled={currQuesIndex <= 0}
          style={currQuesIndex <= 0 ? { opacity: 0.2 } : {}}
          onClick={() => {
            const prevQuestionIndex = currQuesIndex - 1;
            navigate(`/interview/${questions[prevQuestionIndex]._id}`);
          }}
        >
          Previous
        </button>
        <Counter />
        <button
          disabled={currQuesIndex >= questions?.length - 1}
          style={currQuesIndex >= questions?.length - 1 ? { opacity: 0.2 } : {}}
          onClick={() => {
            const nextQuestionIndex = currQuesIndex + 1;
            navigate(`/interview/${questions[nextQuestionIndex]._id}`);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InterviewScreen;
