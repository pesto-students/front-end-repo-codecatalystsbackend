import React, { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signUpUser, loginUser } from "../../apis/userApis";
import { AppContext } from "../../context/AppContext";
import { NotificationManager } from "react-notifications";

import styles from "./signupsignin.module.scss";

function SignUpSignIn({ currentRoute }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const text = currentRoute === "login" ? "Log in" : "Sign up";
  const [userInfo, setUserInfo] = useState({
    email: currentRoute === "login" ? "demo@demo.com" : "",
    password: currentRoute === "login" ? "123123123" : "",
    name: "",
  });

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleOnChange = (e) => {
    const {
      target: { name = "", value = "" },
    } = e;
    setUserInfo((pv) => {
      return {
        ...pv,
        [name]: value,
      };
    });
  };

  const verifyData = (info = {}) => {
    let keys = Object.keys(info);
    let isVerified = true;
    keys.forEach((key) => {
      if (!userInfo[key]) {
        isVerified = false;
      }
    });
    return isVerified;
  };

  const signUp = async () => {
    const { email, password, name } = userInfo;
    const infoVerify = verifyData({ email, password, name });
    if (infoVerify) {
      const isValidEmail = emailRegex.test(email);
      if (!isValidEmail)
        return NotificationManager.info("Please enter a valid email address");
      if (password.length <= 7)
        return NotificationManager.info(
          "Password should have 8 letters or above"
        );
      const fullName = name.split(" ");
      const payload = {
        email,
        password,
        firstname: fullName[0],
        lastname: fullName[1] ? fullName[1] : "",
      };
      const data = await signUpUser(payload);
      if (data) {
        navigate("/login");
      }
    } else {
      NotificationManager.info("please fill all the details");
    }
  };

  const login = async () => {
    const { email, password } = userInfo;
    const infoVerify = verifyData({ email, password });
    if (infoVerify) {
      const payload = {
        email,
        password,
      };
      const data = await loginUser(payload);
      if (data) {
        const { user } = data;
        if (user.image_string?.length === 0) {
          user.image_string =
            "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";
        }
        localStorage.setItem(
          "TBuser",
          JSON.stringify({
            access_token: data.access_token,
            ...user,
          })
        );
        setUser({
          access_token: data.access_token,
          ...user,
        });
        return;
      }
    } else {
      NotificationManager.info("please fill all the details");
    }
  };

  const handleSubmit = async () => {
    if (currentRoute === "signup") {
      await signUp();
    }
    if (currentRoute === "login") {
      await login();
    }
  };

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className={styles.signUpSignInContainer}>
      <h3>{text}</h3>
      <div className={styles.inputContainer}>
        {currentRoute === "signup" && (
          <TextField
            label={"Name"}
            value={userInfo.name}
            name="name"
            onChange={handleOnChange}
            placeHolder={"Enter Your Name"}
          />
        )}
        <TextField
          label={"Email"}
          value={userInfo.email}
          name="email"
          onChange={handleOnChange}
          placeHolder={"Enter Your Email Address"}
          type="email"
        />
        <TextField
          label="Password"
          value={userInfo.password}
          name="password"
          onChange={handleOnChange}
          placeHolder={"Enter Your Password"}
          type="password"
        />
      </div>
      <button onClick={handleSubmit}>{text}</button>
      <div className={styles.br}></div>
      <div className={styles.switchContainer}>
        <p>
          {currentRoute === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}
        </p>
        <Link to={currentRoute === "login" ? "/signup" : "/login"}>
          {currentRoute === "login" ? "Sign up" : "Log in"}
        </Link>
      </div>
    </div>
  );
}

const TextField = ({ label, ...inputProps }) => {
  const { name } = inputProps;
  return (
    <div className={styles.textFieldContainer}>
      {!!label && <label for={name}>{label}</label>}
      <input id={name} {...inputProps} />
    </div>
  );
};

export default SignUpSignIn;
