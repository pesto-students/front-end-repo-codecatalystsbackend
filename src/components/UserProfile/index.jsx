import React, { useState } from "react";

import styles from "./userprofile.module.scss";

function UserProfile() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    skills: "",
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
    <div className={styles.userProfileContainer}>
      <div className={styles.header}>
        <h2>User Profile</h2>
      </div>
      <div className={styles.userDataContainer}>
        <div className={styles.inputContainer}>
          <TextField
            label="Full Name"
            value={userInfo.name}
            name="name"
            onChange={handleOnChange}
            placeHolder={"Enter Your full name"}
          />

          <TextField
            label={"Email Address"}
            value={userInfo.email}
            name="email"
            onChange={handleOnChange}
            placeHolder={"Enter Your Email Address"}
            type="email"
          />

          <TextField
            label={"Skills"}
            value={userInfo.skills}
            name="skills"
            onChange={handleOnChange}
            placeHolder={"Enter Your skills separated by commas"}
          />
        </div>
        <div className={styles.btnsContainer}>
          <button>Save</button>
          <button>Update Password</button>
        </div>
      </div>
      <div className={styles.userImageContainer}>
        <p>Profile Image</p>
        <div className={styles.imageContainer}></div>
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

export default UserProfile;
