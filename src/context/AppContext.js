import { createContext, useState, useEffect } from "react";
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
  const [user, setUser] = useState();
  const [loading, setIsLoading] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState({});

  useEffect(() => {
    let currentUser = localStorage.getItem("TBuser");
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      setUser(currentUser);
    }
  }, []);

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
      if (error?.response?.status === 401) {
        const { data } = error.response;
        if (data === "Invalid Token") {
          localStorage.removeItem("TBuser");
          setUser(undefined);
          NotificationManager.info("Please log in again", "User Logged Out");
        } else {
          NotificationManager.error(data?.error || "Something went wrong");
        }
      }
    }
  );

  const getAllInterviewQuestions = () => {
    if (
      interviewQuestions?.interview_id &&
      interviewQuestions.userQuestions?.length > 0
    ) {
      return interviewQuestions.userQuestions.reduce((acc, questionObj) => {
        acc.push(questionObj.question);
        return acc;
      }, []);
    }
  };

  return (
    <AppContext.Provider
      value={{ user, setUser, setInterviewQuestions, getAllInterviewQuestions }}
    >
      {loading && <Loader />}
      {children}
      <NotificationContainer />
    </AppContext.Provider>
  );
}

export default AppProvider;
