import React, { useContext, useState } from "react";

import styles from "./userprofile.module.scss";
import { Link } from "react-router-dom";
import { updateUser } from "../../apis/userApis";
import { AppContext } from "../../context/AppContext";

function UserProfile() {
  const { user, setUser } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState({
    name: `${user.firstname} ${user.lastname}`,
    email: user.email,
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
  const handleSubmit = async () => {
    let { name, email, skills } = userInfo;
    if (!name || !email) {
      return alert("please enter valid details");
    }
    skills = skills.split(",");
    let fullname = name.split(" ");
    const payload = {
      firstname: fullname[0],
      lastname: fullname[1],
      email,
      skills,
    };
    const res = await updateUser(user.id, payload);
    if (res) {
      const updatedData = {
        ...payload,
        id: user.id,
        access_token: user.access_token,
      };
      localStorage.setItem('TBuser', JSON.stringify(updatedData))
      setUser({ ...payload, id: user.id, access_token: user.access_token });
    }
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
          <button onClick={handleSubmit}>Save</button>
          <Link to="/reset"> Update Password</Link>
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
