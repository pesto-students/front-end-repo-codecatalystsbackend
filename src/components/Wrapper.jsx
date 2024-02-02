import React from "react";
import Header from "./Header";
import ProfileBar from "./ProfileBar";

function Wrapper({ children }) {
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
          {children}
        </SideScreen>
      </div>
    </div>
  );
}

const SideScreen = ({ width, height, style, children }) => {
  return <div style={{ width, height, ...style }}>{children}</div>;
};

export default Wrapper;
