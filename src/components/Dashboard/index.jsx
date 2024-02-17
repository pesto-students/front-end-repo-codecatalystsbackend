import React, { useState, useEffect, useContext } from "react";

import styles from "./dashboard.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getAllInterviews } from "../../apis/interviewApis";
import { AppContext } from "../../context/AppContext";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { defaultInterviewSkills } = useContext(AppContext);
  const [interviews, setInterviews] = useState(undefined);
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
  const recInterviewList = [...defaultInterviewSkills];
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.currentInterviewsContainer}>
        {interviews?.length > 0 && (
          <div className={styles.buttonContainer}>
            <Link to="/start">Start Interview</Link>
          </div>
        )}
        {interviews?.length > 0 && (
          <div className={styles.previousResultsContainer}>
            <p>Previous Results</p>
            <PreviousInterviewsLists list={interviews} />
          </div>
        )}
        {(!interviews || interviews?.length <= 0) && (
          <div className={styles.noInterviewContainer}>
            <p>Let's start with your first Interview practise</p>
            <div className={styles.buttonContainer}>
              <Link to="/start">Start Interview</Link>
            </div>
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
  const navigate = useNavigate();
  const { name, description } = data || {};
  return (
    <div
      className={styles.recIntCardContainer}
      onClick={() => navigate(`/start?skill=${name}`)}
    >
      <div className={styles.imageContainer}>
        <img src={data.src} alt={data.tag} />
      </div>
      <div className={styles.dataContainer}>
        <p>{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Dashboard;
