import React, { useState, useEffect } from "react";

import styles from "./dashboard.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getAllInterviews } from "../../apis/interviewApis";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [interviews, setInterviews] = useState([]);
  useEffect(() => {
    const fetchAllInterviews = async () => {
      if (!user?.id) {
        return navigate("/");
      }
      const res = await getAllInterviews({
        id: user.id,
        pageNumber: 1,
        pageSize: 6,
      });
      if (res?.interview?.length > 0) {
        setInterviews(res.interview);
      }
    };
    fetchAllInterviews();
  }, []);
  const recInterviewList = [
    {
      name: "SQL",
      description: "Crack SQL interview",
    },
    {
      name: "Python",
      description: "Crack Python interview",
    },
  ];
  const previousInterviewList = [
    {
      name: "ReactJS",
      currentScore: 3,
      totalMarks: 10,
    },
    {
      name: "NodeJS",
      currentScore: 5,
      totalMarks: 10,
    },
    {
      name: "AngularJS",
      currentScore: 4,
      totalMarks: 10,
    },
    {
      name: "VueJS",
      currentScore: 8,
      totalMarks: 10,
    },
  ];
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.currentInterviewsContainer}>
        <div className={styles.buttonContainer}>
          <Link to="/start">Start Interview</Link>
        </div>
        {previousInterviewList?.length > 0 && (
          <div className={styles.previousResultsContainer}>
            <p>Previous Results</p>
            <PreviousInterviewsLists list={interviews} />
          </div>
        )}
      </div>
      {recInterviewList?.length > 0 && (
        <div className={styles.RecommendedInterviewContainer}>
          <RecommendedInterviewLists list={recInterviewList} />
        </div>
      )}
    </div>
  );
}

const PreviousInterviewsLists = ({ list }) => {
  if (!Array.isArray(list) || list.length <= 0) {
    return <></>;
  }
  return (
    <div className={styles.previousResultsBox}>
      <div className={styles.previousResults}>
        {list.map((preInt, index) => (
          <PreviousInterviewCards data={preInt} key={index} />
        ))}
      </div>
      <Link to="/history">View All</Link>
    </div>
  );
};

const RecommendedInterviewLists = ({ list }) => {
  if (!Array.isArray(list) || list.length <= 0) {
    return <></>;
  }
  return (
    <div className={styles.recommenderInterview}>
      {list.map((intList, index) => (
        <RecommendedInterviewCards data={intList} key={index} />
      ))}
    </div>
  );
};

const PreviousInterviewCards = ({ data }) => {
  let color = "#4bb543";
  const { correct_answer_count = 0, questions, category } = data || {};
  const percentage = (correct_answer_count / questions.length) * 100;
  if (percentage < 80 && percentage >= 50) {
    color = "#2D99FF";
  } else if (percentage < 50) {
    color = "#FF6C40";
  }
  return (
    <div className={styles.prevIntCardContainer}>
      <div
        className={styles.scoreBar}
        style={{
          background: `conic-gradient(${color} ${percentage}%, rgb(242, 242, 242) ${percentage}%)`,
        }}
      ></div>
      <div className={styles.dataContainer}>
        <p>
          {correct_answer_count}/{questions.length}
        </p>
        <p>{category}</p>
      </div>
    </div>
  );
};

const RecommendedInterviewCards = ({ data }) => {
  const { name, description } = data || {};
  return (
    <div className={styles.recIntCardContainer}>
      <div className={styles.imageContainer}></div>
      <div className={styles.dataContainer}>
        <p>{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Dashboard;
