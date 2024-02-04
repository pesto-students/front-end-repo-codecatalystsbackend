import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { signUpUser, loginUser } from "../../apis/userApis";
import { AppContext } from "../../context/AppContext";

import styles from "./signupsignin.module.scss";

function SignUpSignIn({ currentRoute }) {
  const { user, setUser } = useContext(AppContext);
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
      const fullName = name.split(" ");
      const payload = {
        email,
        password,
        firstname: fullName[0],
        lastname: fullName[1] ? fullName[1] : "",
      };
      const data = await signUpUser(payload);
      if (data) {
        if (!data.msg) {
          window.location.replace("/login");
          return;
        } else {
          alert(data.msg);
        }
      }
    } else {
      alert("please fill all the details");
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
        if (!data.msg) {
          localStorage.setItem(
            "TBuser",
            JSON.stringify({
              access_token: data.access_token,
              ...data.user,
            })
          );
          setUser(data.user);
          return;
        } else {
          alert(data.msg);
        }
      }
    } else {
      alert("please fill all the details");
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
