import React from "react";

import styles from "./landingpage.module.scss";
import Header from "../Header";
import LandingPageImage from "../../assets/pngs/landing_page.png";
import AboutUsImage from "../../assets/pngs/about_us.png";
import FAQImage from "../../assets/pngs/faq.png";
import PrivaryPolicyImage from "../../assets/pngs/privary_policy.png";
import SignUpSignIn from "../SignUpSignIn/SignUpSignIn";

function LandingPage({ currentRoute }) {
  return (
    <div className={styles.landingPageContainer}>
      <div className={styles.landingPageHeader}>
        <Header showLoginBtn={!currentRoute} />
      </div>
      <div className={styles.imageContainer}>
        <img src={LandingPageImage} alt={"landing page image"} />
      </div>
      <div className={styles.landingPageContent}>
        <p>Hi there!</p>
        <h2>
          Your gateway to polished interview performance and job matches.!
        </h2>
        <p>
          Empowering job seekers by honing interview skills and linking them to
          fitting roles.
        </p>
        <button>Let's Start</button>
      </div>
      <div className={styles.bottomCardsContainer}>
        <div className={styles.bottomCard}>
          <div className={styles.imageContainer}>
            <img src={AboutUsImage} alt="about us image" />
          </div>
          <p>About us</p>
          <span>
            Make your website user friendly and look more professional
          </span>
        </div>
        <div className={styles.bottomCard}>
          <div className={styles.imageContainer}>
            <img src={FAQImage} alt="FAQ image" />
          </div>
          <p>FAQ</p>
          <span>
            Gain more followers or subscribers with the right template
          </span>
        </div>
        <div className={styles.bottomCard}>
          <div className={styles.imageContainer}>
            <img src={PrivaryPolicyImage} alt="privacy policy image" />
          </div>
          <p>Privacy Policy</p>
          <span>Complete your digital work with appropriate artwork</span>
        </div>
      </div>
      {currentRoute && (
        <div className={styles.signupsigninFormContainer}>
          <SignUpSignIn currentRoute={currentRoute} />
        </div>
      )}
    </div>
  );
}

export const LoginPage = () => {
  return <LandingPage currentRoute={"login"} />;
};

export const SignUpPage = () => {
  return <LandingPage currentRoute={"signup"} />;
};

export default LandingPage;
