import Wrapper from "./Wrapper";
import { LoginPage, SignUpPage } from "./LandingPage";
import App from "../App";
import InterviewStart from "./InterviewStart";
import InterviewQuestions from "./InterviewQuestions";
import InterviewHistory from "./InterviewHistory";
import InterviewResult from "./InterviewResult";
import InterviewScreen from "./InterviewScreen";
import UserProfile from "./UserProfile";
import PasswordChange from "./PasswordChange";

import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const WrapperComponent = ({ Component, ...props }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <Wrapper>
      <Component {...props} />
    </Wrapper>
  );
};

let Routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/start/:id",
    element: <WrapperComponent Component={InterviewStart} />,
  },
  {
    path: "/questions/:id",
    element: <WrapperComponent Component={InterviewQuestions} />,
  },
  {
    path: "/history",
    element: <WrapperComponent Component={InterviewHistory} />,
  },
  {
    path: "/result",
    element: <WrapperComponent Component={InterviewResult} />,
  },
  {
    path: "/interview/:id",
    element: <WrapperComponent Component={InterviewScreen} />,
  },
  {
    path: "/user",
    element: <WrapperComponent Component={UserProfile} />,
  },
  {
    path: "/reset",
    element: <WrapperComponent Component={PasswordChange} />,
  },
];

export default Routes;
