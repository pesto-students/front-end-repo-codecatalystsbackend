import React from "react";

import styles from "./profilebar.module.scss";

function ProfileBar() {
  return (
    <div className={styles.sideProfileContainer}>
      <ProfileCard />
      <CurrentPage />
      <div className={styles.logoutButton}>
        <button>Logout</button>
      </div>
    </div>
  );
}

const ProfileCard = () => {
  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.imageContainer}>{/* <img /> */}</div>
      <p>Sarthak</p>
      <span>sarthakg.developer@gmail.com</span>
    </div>
  );
};

const CurrentPage = () => {
  const totalPages = ["Dashboard", "Accounts", "Settings"];
  return (
    <div className={styles.pagesContainer}>
      {totalPages.map((page, index) => (
        <div key={index}>
          <p>{page}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileBar;
