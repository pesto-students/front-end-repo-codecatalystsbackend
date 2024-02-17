import React, { useContext } from "react";

import styles from "./interviewscreen.module.scss";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Counter from "../Counter/Counter";

function InterviewScreen({ isReview = false }) {
  const navigate = useNavigate();
  const params = useParams();
  const app = useContext(AppContext);
  const { getInterviewQuestionById, handleInterviewSubmit } = app;
  let interviewQuestions;
  let currentQuestion;
  if (!isReview) {
    const { interviewQuestions: newQuestion } = app;
    interviewQuestions = newQuestion;
    currentQuestion = getInterviewQuestionById(params.id || "");
  } else {
    const { reviewQuestions } = app;
    const getReviewQuestionById = (id) => {
      if (!id) return;
      const { questions = [] } = reviewQuestions;
      let question;
      if (questions.length > 0) {
        question = questions.find((ques) => ques._id === id);
      }
      return question;
    };
    interviewQuestions = reviewQuestions;
    currentQuestion = getReviewQuestionById(params.id || "");
  }
  const { category = "", _id = "", questions = [] } = interviewQuestions;
  let correctAnswer, userAnswer;
  if (isReview) {
    const { answer, user_answer } = currentQuestion;
    if (answer) {
      correctAnswer = answer;
    }
    if (user_answer) {
      userAnswer = user_answer;
    }
  }
  if (!_id || questions?.length <= 0 || !currentQuestion) {
    return <Navigate to="/" replace={true} />;
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
            <OptionsList
              list={options}
              questionId={params.id}
              correctAnswer={correctAnswer}
              userAnswer={userAnswer}
              isReview={isReview}
            />
          </div>
          <QuestionController
            currQuesIndex={questionIndex}
            questions={questions}
            isReview={isReview}
          />
        </div>
      </div>
      {!isReview && (
        <div className={styles.buttonsContainer}>
          <div>
            <Link to="/questions">View all Questions List</Link>
          </div>
          <div>
            <button
              onClick={() =>
                handleInterviewSubmit({ cb: (id) => navigate(`/result/${id}`) })
              }
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const OptionsList = ({
  list,
  questionId,
  correctAnswer,
  userAnswer,
  isReview,
}) => {
  const { selectedAnswer, setSelectedAnswer } = useContext(AppContext);

  if (!Array.isArray(list) || list.length <= 0) {
    return <></>;
  }
  let isUserAnswerCorrect = false;
  if (isReview) {
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
    if (isReview) return;
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
  const getOptionStyle = (option) => {
    const style = { backgroundColor: "rgba(255, 255, 255, 0.3)" };
    if (!isReview && selectedAnswer[questionId]?.option === option) {
      style.backgroundColor = "#4bb543";
    }
    if (isReview) {
      let selectedOption = option.split(":")[0].toLowerCase();
      if (correctAnswer === selectedOption) {
        style.backgroundColor = "#4bb543";
      }
      if (userAnswer === selectedOption) {
        if (userAnswer !== correctAnswer) {
          style.backgroundColor = "#FF6C40";
        } else {
          style.backgroundColor = "#4bb543";
        }
      }
    }
    return style;
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
                    style={getOptionStyle(eOption)}
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

const QuestionController = ({
  currQuesIndex = 0,
  questions = [],
  isReview,
}) => {
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div className={styles.questionControllerContainer}>
        <button
          disabled={currQuesIndex <= 0}
          style={currQuesIndex <= 0 ? { opacity: 0.2 } : {}}
          onClick={() => {
            const prevQuestionIndex = currQuesIndex - 1;
            navigate(
              `/${isReview ? "review" : "interview"}/${
                questions[prevQuestionIndex]._id
              }`
            );
          }}
        >
          Previous
        </button>
        {!isReview && <Counter />}
        <button
          disabled={currQuesIndex >= questions?.length - 1}
          style={currQuesIndex >= questions?.length - 1 ? { opacity: 0.2 } : {}}
          onClick={() => {
            const nextQuestionIndex = currQuesIndex + 1;
            navigate(
              `/${isReview ? "review" : "interview"}/${
                questions[nextQuestionIndex]._id
              }`
            );
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InterviewScreen;
