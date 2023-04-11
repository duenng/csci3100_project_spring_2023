import React, { useState } from "react";
import styles from "../../styles/login.module.css";

const Login = () => {
  const [activeForm, setActiveForm] = useState("login");

  const handleFormSwitch = (form) => {
    setActiveForm(form);
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.sectionTitle}>Authentication</h1>
      <div className={styles.forms}>
        <div className={`${styles.formWrapper}${activeForm === "login" ? ` ${styles.isActive}` : ""}`}>
          <button
            type="button"
            className={`${styles.switcher} ${styles.switcherLogin}`}
            onClick={() => handleFormSwitch("login")}
          >
            Login
            <span className={styles.underline}></span>
          </button>
          <form className={`${styles.form} ${styles.formLogin}`}>
            {/* ... */}
          </form>
        </div>
        <div className={`${styles.formWrapper}${activeForm === "signup" ? ` ${styles.isActive}` : ""}`}>
          <button
            type="button"
            className={`${styles.switcher} ${styles.switcherSignup}`}
            onClick={() => handleFormSwitch("signup")}
          >
            Sign Up
            <span className={styles.underline}></span>
          </button>
          <form className={`${styles.form} ${styles.formSignup}`}>
            {/* ... */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
