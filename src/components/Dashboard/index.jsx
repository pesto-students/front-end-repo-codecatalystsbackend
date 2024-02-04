import React from "react";

import styles from "./dashboard.module.scss";
import { Link } from "react-router-dom";

function Dashboard() {
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
            <PreviousInterviewsLists list={previousInterviewList} />
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
    <div className={styles.previousResults}>
      {list.map((preInt, index) => (
        <PreviousInterviewCards data={preInt} key={index} />
      ))}
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
  const { currentScore = 0, totalMarks = 0, name } = data || {};
  const percentage = (currentScore / totalMarks) * 100;
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
          {currentScore}/{totalMarks}
        </p>
        <p>{name}</p>
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
