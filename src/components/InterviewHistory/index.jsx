import React, { useContext, useEffect, useState } from "react";

import styles from "./interviewhistory.module.scss";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getAllInterviews } from "../../apis/interviewApis";
import dayjs from "dayjs";
import { AppContext } from "../../context/AppContext";

function InterviewHistory() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [interviews, setInterviews] = useState([]);
  useEffect(() => {
    const fetchAllInterviews = async () => {
      if (!user?.id) {
        return navigate("/");
      }
      const res = await getAllInterviews({ id: user.id, pageSize: 30 });
      if (res?.interview?.length > 0) {
        setInterviews(res.interview);
      }
    };
    fetchAllInterviews();
  }, []);

  return (
    <div className={styles.interviewHistoryContainer}>
      <div className={styles.header}>
        <p>Interview History</p>
      </div>
      <div className={styles.historyContainer}>
        <div className={styles.history}>
          <div>
            <p>Title</p>
            <p>Date</p>
            <p>Score</p>
            <p></p>
          </div>
        </div>
        <div className={styles.history}>
          {interviews.length > 0 &&
            interviews.map((attempt, index) => (
              <EachInterviewData attempt={attempt} key={index} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

const EachInterviewData = ({ attempt, index }) => {
  const navigate = useNavigate();
  const { setReviewQuestions } = useContext(AppContext);
  const handleViewClick = () => {
    console.log(attempt);
    setReviewQuestions(attempt);
    navigate(`/review/${attempt.questions[0]?._id}`);
  };
  return (
    <div>
      <p>
        {index + 1}. {attempt.category}
      </p>
      <p>{dayjs(attempt.created_on).format("DD/MM/YYYY")}</p>
      <p>
        {attempt.correct_answer_count}/{attempt.questions?.length}
      </p>
      <button onClick={handleViewClick}>View</button>
    </div>
  );
};

export default InterviewHistory;
