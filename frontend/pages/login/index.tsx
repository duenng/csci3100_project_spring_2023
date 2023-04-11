import React, { useState, useCallback, useContext } from "react";
import styles from "../../styles/login.module.css";
import { useRouter } from 'next/router';
import { auth } from '../../components/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../components/UserContext";
import {AuthContextProvider} from '@/components/UserContext';

const Login = () => {
  const [activeForm, setActiveForm] = useState("login");

  const handleFormSwitch = (form) => {
    setActiveForm(form);
  };
  const router = useRouter(); // Use the useRouter hook

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { loginEmail, loginPassword } = event.target.elements;
      try {
        const result = await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
        router.push('/'); // Use the router.push method instead of history.push
      } catch (error) {
		console.log(error);
        alert("Wrong email or password.", error);
      }
    },
    [router] // Add router to the dependency array
  );
  return (
	<div className={styles.body}>
		<section className={styles.formsSection}>
		  <h1 className={styles.sectionTitle}>Authentication Portal</h1>
		  <div className={styles.forms}>
			<div className={`${styles.formWrapper} ${activeForm === "login" ? styles.formWrapperIsActive : ""}`}>
			  <button type="button" className={`${styles.switcher} ${styles.switcherLogin}`} onClick={() => handleFormSwitch("login")}>
				Login
				<span className={styles.underline}></span>
			  </button>
			  <form onSubmit={handleLogin} className={`${styles.form} ${styles.formLogin} ${activeForm === "login" ? styles.formWrapperIsActiveFormLogin : ""}`}>
				<fieldset>
				  <legend>Please, enter your email and password for login.</legend>
				  <div className={styles.inputBlock}>
					<label htmlFor="loginEmail">E-mail</label>
					<input id="loginEmail" type="email" required />
				  </div>
				  <div className={styles.inputBlock}>
					<label htmlFor="loginPassword">Password</label>
					<input id="loginPassword" type="password" required />
				  </div>
				</fieldset>
				<button type="submit" className={`${styles.btnLogin}`}>
				  Login
				</button>
			  </form>
			</div>
			<div className={`${styles.formWrapper} ${activeForm === "signup" ? styles.formWrapperIsActive : ""}`}>
			  <button type="button" className={`${styles.switcher} ${styles.switcherSignup}`} onClick={() => handleFormSwitch("signup")}>
				Sign Up
				<span className={styles.underline}></span>
			  </button>
			  <form className={`${styles.form} ${styles.formSignup}`}>
				<fieldset>
				  <legend>Please, enter your email, password and password confirmation for sign up.</legend>
				  <div className={styles.inputBlock}>
					<label htmlFor="signup-email">E-mail</label>
					<input id="signup-email" type="email" required />
				  </div>
				  <div className={styles.inputBlock}>
					<label htmlFor="signup-password">Password</label>
					<input id="signup-password" type="password" required />
				  </div>
				  <div className={styles.inputBlock}>
					<label htmlFor="signup-password-confirm">Confirm password</label>
					<input id="signup-password-confirm" type="password" required />
				  </div>
				</fieldset>
				<button type="submit" className={`${styles.btnSignup}`}>
				  Continue
				</button>
			  </form>
			</div>
		  </div>
		</section>
	</div>
  );
};

export default Login;
