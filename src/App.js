import React from "react";
import Header from "./components/Header";
import ProfileBar from "./components/ProfileBar";

import { Route, Switch } from "react-router-dom";

import "./App.css";
import LandingPage from "./components/LandingPage";
import Loader from "./components/Loader";
import UserProfile from "./components/UserProfile";
import PasswordChange from "./components/PasswordChange";

const App = () => {
  // const CURRENTSCREEN = (
  //   <Loader loaderText={"Processing Interview Questions..."} />
  // );
  const CURRENTSCREEN = <PasswordChange />;
  const sideScreenStyle = {
    borderRadius: "12px",
    background: "rgba(217, 217, 217, 0.2)",
  };

  // return <LandingPage currentRoute={"login"} />;

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
