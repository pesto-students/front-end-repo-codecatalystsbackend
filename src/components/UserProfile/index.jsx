import React, { useContext, useState } from "react";

import styles from "./userprofile.module.scss";
import { Link } from "react-router-dom";
import { updateUser } from "../../apis/userApis";
import { AppContext } from "../../context/AppContext";
import { NotificationManager } from "react-notifications";

import "react-notifications/lib/notifications.css";

function UserProfile() {
  const { user, setUser } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState({
    name: `${user.firstname} ${user.lastname}`,
    email: user.email,
    skills: user.skills?.join(", ") || "",
    image_string: user.image_string || null,
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setUserInfo((pv) => ({
        ...pv,
        image_string: reader.result.split(",")[1],
      }));
    };
  };

  const handleSubmit = async () => {
    let { name, email, skills, image_string } = userInfo;
    if (!name || !email) {
      return NotificationManager.info("please enter valid details");
    }
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail)
      return NotificationManager.info("Please enter a valid email address");
    const skillsArray = skills.replace(/ /g, "").split(",");
    let fullname = name.split(" ");
    const payload = {
      firstname: fullname[0],
      lastname: fullname[1],
      email,
      skills: skillsArray,
      image_string,
    };
    const res = await updateUser(user.id, payload);
    if (res) {
      const updatedData = {
        ...payload,
        id: user.id,
        access_token: user.access_token,
      };
      localStorage.setItem("TBuser", JSON.stringify(updatedData));
      setUser({ ...payload, id: user.id, access_token: user.access_token });
      NotificationManager.success("User info updated successfully");
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
        <div className={styles.imageContainer}>
          {userInfo.image_string != null && (
            <img
              src={`data:image;base64,${userInfo.image_string}`}
              alt="user_image"
            />
          )}
        </div>
        <label for="ImageID" className={styles.uplaodImageBtn}>
          Add New image
        </label>
        <input
          type="file"
          accept="image/*"
          id="ImageID"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
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
