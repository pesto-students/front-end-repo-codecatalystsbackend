import { createContext, useState, useRef, useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import "react-notifications/lib/notifications.css";
import { submitInterview } from "../apis/interviewApis";

export const AppContext = createContext("");

const DOMAIN = "https://talentbridge-zkvv.onrender.com";
const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

function AppProvider({ children }) {
  const localUser = localStorage.getItem("TBuser");
  const [user, setUser] = useState(
    localUser ? JSON.parse(localUser) : undefined
  );
  const [loading, setIsLoading] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState({});
  const [reviewQuestions, setReviewQuestions] = useState({});
  const interviewDurationInSecs = useRef(600);
  const defaultInterviewSkills = [
    {
      name: "SQL",
      description: "Crack SQL interview",
      src: "https://images.unsplash.com/photo-1662026911591-335639b11db6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tag: "SQL image",
    },
    {
      name: "Python",
      description: "Crack Python interview",
      src: "https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tag: "Python image",
    },
  ];
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const resultRef = useRef({});
  const [counter, setCounter] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    if (interviewQuestions?._id) {
      const currentDuration =
        interviewQuestions.duration || interviewDurationInSecs.current;
      let minutes = Math.floor(currentDuration / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      let seconds = currentDuration - minutes * 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      setCounter({ minutes, seconds });
    }
  }, [interviewQuestions]);

  useEffect(() => {
    const { minutes, seconds } = counter;
    if (parseInt(seconds) > 0) {
      setTimeout(() => {
        setCounter((pv) => {
          let { seconds: prevSeconds } = pv;
          prevSeconds = parseInt(prevSeconds) - 1;
          if (prevSeconds < 10) {
            prevSeconds = `0${prevSeconds}`;
          }
          return {
            ...pv,
            seconds: prevSeconds,
          };
        });
      }, 1000);
    } else {
      if (parseInt(minutes) > 0) {
        setTimeout(() => {
          setCounter((pv) => {
            let { minutes: prevMinutes } = pv;
            prevMinutes = parseInt(prevMinutes) - 1;
            if (prevMinutes < 10) {
              prevMinutes = `0${prevMinutes}`;
            }
            return {
              ...pv,
              minutes: prevMinutes,
              seconds: "59",
            };
          });
        }, 1000);
      } else {
        handleInterviewSubmit();
      }
    }
  }, [counter]);

  const handleInterviewSubmit = async ({ cb = () => {} } = {}) => {
    const answersPayload = [];
    const obj = Object.entries(selectedAnswer);
    if (obj?.length > 0) {
      obj.forEach((answer) => {
        const currentAnswer = {
          question_id: answer[0],
          answer: answer[1].answer,
        };
        answersPayload.push(currentAnswer);
      });
      const res = await submitInterview(interviewQuestions._id, answersPayload);
      if (res) {
        resultRef.current = {
          ...resultRef.current,
          [res._id]: {
            category: res.category || "",
            correctAnswer: res.correct_answer_count || 0,
            totalQuestions: res.questions.length,
          },
        };
        cb(res._id);
      }
      setSelectedAnswer({});
      setInterviewQuestions({});
      setCounter({ minutes: 0, seconds: 0 });
    }
  };

  axios.interceptors.request.use(
    (config) => {
      if (!isAbsoluteURLRegex.test(config.url)) {
        config.url = `${DOMAIN}${config.url}`;
      }
      let user = localStorage.getItem("TBuser");
      if (user) {
        let { access_token } = JSON.parse(user);
        if (access_token) {
          config.headers["x-access-token"] = access_token;
        }
      }
      setIsLoading(true);
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (config) => {
      setIsLoading(false);
      return config;
    },
    (error) => {
      setIsLoading(false);
      if (error?.response?.status === 400) {
        const { data } = error.response;
        if (data?.error === "Invalid Token") {
          localStorage.removeItem("TBuser");
          setUser(undefined);
          NotificationManager.info("Please log in again", "User Logged Out");
        } else {
          NotificationManager.error(data?.error || "Something went wrong");
        }
      } else {
        NotificationManager.error("Something went wrong");
      }
    }
  );

  const getInterviewQuestionById = (id) => {
    if (!id) return;
    const { questions = [] } = interviewQuestions;
    let question;
    if (questions.length > 0) {
      question = questions.find((ques) => ques._id === id);
    }
    return question;
  };

  const getResultsById = (id) => {
    if (!id) return;
    return resultRef.current[id] || {};
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        interviewDurationInSecs,
        interviewQuestions,
        setInterviewQuestions,
        getInterviewQuestionById,
        selectedAnswer,
        setSelectedAnswer,
        handleInterviewSubmit,
        counter,
        getResultsById,
        reviewQuestions,
        setReviewQuestions,
        defaultInterviewSkills,
        loading,
      }}
    >
      {loading && <Loader />}
      {children}
      <NotificationContainer />
    </AppContext.Provider>
  );
}

export default AppProvider;
