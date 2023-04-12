import React, { useState, useCallback, useContext } from "react";
import styles from "../../styles/login.module.css";
import { useRouter } from 'next/router';
import { auth } from '../../components/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../components/UserContext";
import {AuthContextProvider} from '@/components/UserContext';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../components/firebase";
import { doc, setDoc } from "firebase/firestore";

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
  const handleSignUp = useCallback(
	async (event) => {
	  event.preventDefault();
	  const { signupEmail, signupPassword, signupPasswordConfirm, signupUsername, signupAvatar } = event.target.elements;
  
	  if (signupPassword.value !== signupPasswordConfirm.value) {
		alert("Passwords do not match.");
		return;
	  }
  
	  try {
		const result = await createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value);
  
		// Handle avatar upload
		if (signupAvatar.files[0]) {
		  const avatarRef = ref(storage, `avatars/${result.user.uid}`);
		  await uploadBytes(avatarRef, signupAvatar.files[0]);
        const avatarURL = await getDownloadURL(avatarRef);
        
        // Save the username and avatar URL to Firestore
        const userDocRef = doc(db, "users", result.user.uid);

        await setDoc(userDocRef, {
          username: signupUsername.value,
          avatarURL: avatarURL
        });
      } else {
        // Save the username without an avatar URL to Firestore
        const userDocRef = doc(db, "users", result.user.uid);
        await setDoc(userDocRef, {
          username: signupUsername.value,
          avatarURL: null
        });
      }

      // You can add any additional user-related setup here, like setting their display name
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Failed to create account.", error);
    }
  },
  [router]
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
			  <form onSubmit={handleSignUp} className={`${styles.form} ${styles.formSignup}`}>
				<fieldset>
				  <legend>Please, enter your email, password and password confirmation for sign up.</legend>
				  	<div className={styles.inputBlock}>
					<label htmlFor="signupUsername">Username</label>
					<input id="signupUsername" type="text" required />
					</div>
					<div className={styles.inputBlock}>
					<label htmlFor="signupAvatar">Avatar</label>
					<input id="signupAvatar" type="file" />
					</div>
					<div className={styles.inputBlock}>
					  <label htmlFor="signupEmail">E-mail</label>
					  <input id="signupEmail" type="email" required />
					</div>
					<div className={styles.inputBlock}>
					  <label htmlFor="signupPassword">Password</label>
					  <input id="signupPassword" type="password" required />
					</div>
					<div className={styles.inputBlock}>
					  <label htmlFor="signupPasswordConfirm">Confirm password</label>
					  <input id="signupPasswordConfirm" type="password" required />
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
