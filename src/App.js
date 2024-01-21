import React from "react";
import Header from "./components/Header/Header";
import ProfileBar from "./components/ProfileBar/ProfileBar";
import InterviewStart from "./components/InterviewStart/InterviewStart";
import InterviewQuestions from "./components/InterviewQuestions/InterviewQuestions";
import InterviewHistory from "./components/InterviewHistory/InterviewHistory";
import InterviewResult from "./components/InterviewResult/InterviewResult";
import UserProfile from "./components/UserProfile/UserProfile";

import "./App.css";

const App = () => {
  const CURRENTSCREEN = <InterviewStart />;
  // const CURRENTSCREEN = <UserProfile />;
  const sideScreenStyle = {
    borderRadius: "12px",
    background: "rgba(217, 217, 217, 0.2)",
  };

  return (
    <div className="appContainer">
      <Header />
      <div className="App">
        <SideScreen width={"20%"} height={"100%"} style={sideScreenStyle}>
          <ProfileBar />
        </SideScreen>
        <SideScreen width={"80%"} height={"100%"} style={sideScreenStyle}>
          {CURRENTSCREEN}
        </SideScreen>
      </div>
    </div>
  );
};

const SideScreen = ({ width, height, style, children }) => {
  return <div style={{ width, height, ...style }}>{children}</div>;
};

export default App;
