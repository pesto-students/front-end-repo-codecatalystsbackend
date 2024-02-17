import React from "react";

import "./App.css";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import Wrapper from "./components/Wrapper";

import useAuth from "./hooks/useAuth";

const App = () => {
  const { user } = useAuth();
  if (!user) {
    return <LandingPage />;
  }

  return (
    <Wrapper>
      <Dashboard />
    </Wrapper>
  );
};

export default App;
