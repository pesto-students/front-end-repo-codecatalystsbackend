import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import styles from "./profilebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

function ProfileBar() {
  const { setUser } = useContext(AppContext);

  const handleLogout = () => {
    setUser(undefined);
    localStorage.removeItem("TBuser");
  };
  return (
    <div className={styles.sideProfileContainer}>
      <ProfileCard />
      <CurrentPage />
      <div className={styles.logoutButton}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

const ProfileCard = () => {
  const { user } = useContext(AppContext);
  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.imageContainer}>{/* <img /> */}</div>
      <p>
        {user?.firstname} {user?.lastname}
      </p>
      <span>{user?.email}</span>
    </div>
  );
};

const CurrentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPages = [
    { section: "Dashboard", url: "/" },
    { section: "Profile", url: "/user" },
  ];
  const exactPath = location.pathname.split("/")[1];
  let isNavigationAllowed =
    exactPath !== "questions" && exactPath !== "interview";
  return (
    <div className={styles.pagesContainer}>
      {totalPages.map((page, index) => (
        <div key={index}>
          <button
            onClick={() => {
              if (isNavigationAllowed) {
                navigate(page.url);
              } else {
                NotificationManager.info("Please Submit the current interview");
              }
            }}
            to={page.url}
            style={
              page.url === location.pathname
                ? { fontSize: "22px", color: "#fff" }
                : {}
            }
          >
            {page.section}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProfileBar;
