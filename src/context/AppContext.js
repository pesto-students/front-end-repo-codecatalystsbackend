import { createContext, useState, useRef, useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import "react-notifications/lib/notifications.css";

export const AppContext = createContext("");

const DOMAIN = "https://talentbridge-zkvv.onrender.com";
const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

function AppProvider({ children }) {
  const localUser = localStorage.getItem("TBuser");
  const [user, setUser] = useState(
    localUser ? JSON.parse(localUser) : undefined
  );
  const [loading, setIsLoading] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState({
    _id: "65c6a139568feb424d5a62e9",
    category: "NodeJS",
    questions: [
      {
        question: "What is the package manager for Node.js?",
        options: {
          a: "npm",
          b: "yarn",
          c: "bower",
          d: "gulp",
          _id: "65c6a139568feb424d5a62eb",
        },
        _id: "65c6a139568feb424d5a62ea",
      },
      {
        question:
          "Which of the following is a popular framework for building Node.js applications?",
        options: {
          a: "Express",
          b: "Django",
          c: "Flask",
          d: "Spring",
          _id: "65c6a139568feb424d5a62ed",
        },
        _id: "65c6a139568feb424d5a62ec",
      },
      {
        question: "What is the purpose of require() function in Node.js?",
        options: {
          a: "To define a new variable",
          b: "To include external modules",
          c: "To declare a function",
          d: "To create a new object",
          _id: "65c6a139568feb424d5a62ef",
        },
        _id: "65c6a139568feb424d5a62ee",
      },
      {
        question: "Which of the following is an HTTP framework for Node.js?",
        options: {
          a: "BodyParser",
          b: "Passport",
          c: "Axios",
          d: "Restify",
          _id: "65c6a139568feb424d5a62f1",
        },
        _id: "65c6a139568feb424d5a62f0",
      },
      {
        question:
          "In Node.js, which method is used to append new data to a file?",
        options: {
          a: "appendToFile()",
          b: "writeFile()",
          c: "appendFile()",
          d: "createFile()",
          _id: "65c6a139568feb424d5a62f3",
        },
        _id: "65c6a139568feb424d5a62f2",
      },
      {
        question:
          "What is the event-driven model used in Node.js for handling I/O operations?",
        options: {
          a: "Sync",
          b: "Async",
          c: "EventEmitter",
          d: "Promise",
          _id: "65c6a139568feb424d5a62f5",
        },
        _id: "65c6a139568feb424d5a62f4",
      },
      {
        question:
          "Which module in Node.js is used for stream-based data processing?",
        options: {
          a: "fs",
          b: "http",
          c: "crypto",
          d: "path",
          _id: "65c6a139568feb424d5a62f7",
        },
        _id: "65c6a139568feb424d5a62f6",
      },
      {
        question: "What does the term 'callback' refer to in Node.js?",
        options: {
          a: "A function passed as an argument to another function",
          b: "A method used to handle errors",
          c: "A software module that handles authentication",
          d: "A built-in Node.js class for handling database queries",
          _id: "65c6a139568feb424d5a62f9",
        },
        _id: "65c6a139568feb424d5a62f8",
      },
      {
        question:
          "Which command is used to start a Node.js application in debug mode?",
        options: {
          a: "node start --debug",
          b: "node --inspect",
          c: "node --debug",
          d: "node debug start",
          _id: "65c6a139568feb424d5a62fb",
        },
        _id: "65c6a139568feb424d5a62fa",
      },
      {
        question: "What is the default port number for Node.js applications?",
        options: {
          a: "3000",
          b: "8080",
          c: "5000",
          d: "3030",
          _id: "65c6a139568feb424d5a62fd",
        },
        _id: "65c6a139568feb424d5a62fc",
      },
    ],
    duration: 0,
  });
  const interviewDurationInSecs = useRef(600);
  const [selectedAnswer, setSelectedAnswer] = useState({});
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
        alert("time up");
      }
    }
  }, [counter]);

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
        if (data === "Invalid Token") {
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
        counter,
      }}
    >
      {loading && <Loader />}
      {children}
      <NotificationContainer />
    </AppContext.Provider>
  );
}

export default AppProvider;
