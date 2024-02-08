import React, { useState } from "react";
import { resetPassword } from "../../apis/userApis";
import useAuth from "../../hooks/useAuth";

import styles from "./passwordchange.module.scss";

function PasswordChange() {
  const { user } = useAuth();
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
  const handleSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = userInfo;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return alert("Please fill all the details");
    }
    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }
    const res = await resetPassword(user.id, {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    console.log(res, "res");
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

      <button onClick={handleSubmit}>Update</button>
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
