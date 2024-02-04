import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import styles from "./profilebar.module.scss";
import { Link, useLocation } from "react-router-dom";

function ProfileBar() {
  const { user, setUser } = useContext(AppContext);

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
        {user.firstname} {user.lastname}
      </p>
      <span>{user.email}</span>
    </div>
  );
};

const CurrentPage = () => {
  const location = useLocation();
  const totalPages = [
    { section: "Dashboard", url: "/" },
    { section: "Profile", url: "/user" },
  ];
  return (
    <div className={styles.pagesContainer}>
      {totalPages.map((page, index) => (
        <div key={index}>
          <Link
            to={page.url}
            style={
              page.url === location.pathname
                ? { fontSize: "22px", color: "#fff" }
                : {}
            }
          >
            {page.section}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProfileBar;
