import React, { useState } from "react";

import styles from "./passwordchange.module.scss";

function PasswordChange() {
  const [userInfo, setUserInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
    <div className={styles.passwordChangeContainer}>
      <TextField
        label="Current Password"
        value={userInfo.currentPassword}
        name="currentPassword"
        onChange={handleOnChange}
        placeHolder={"Enter Your Current Password"}
      />

      <TextField
        label={"New Password"}
        value={userInfo.newPassword}
        name="newPassword"
        onChange={handleOnChange}
        placeHolder={"Enter Your New Password"}
        type="password"
      />

      <TextField
        label={"Confirm Password"}
        value={userInfo.confirmPassword}
        name="confirmPassword"
        onChange={handleOnChange}
        placeHolder={"Confirm Your Password"}
        type="password"
      />

      <button>Update</button>
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

export default PasswordChange;
