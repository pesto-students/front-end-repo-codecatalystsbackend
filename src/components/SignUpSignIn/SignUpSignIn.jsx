import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./signupsignin.module.scss";

function SignUpSignIn({ currentRoute }) {
  const text = currentRoute === "login" ? "Log in" : "Sign up";
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
  });

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
      <button>{text}</button>
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
