import React, { useState, useCallback, useContext } from "react";
import styles from "../../styles/login.module.css";
import { useRouter } from 'next/router';
import { auth } from '../../components/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../components/firebase";
import { storage } from '../../components/firebase';
import { doc, setDoc } from "firebase/firestore";
import axios from 'axios'; // or import fetch from 'node-fetch';
const BACKEND_URL = 'http://localhost:3001'; // Replace with your actual backend URL

const Login = () => {
  const [activeForm, setActiveForm] = useState("login");

  const handleFormSwitch = (form) => {
    setActiveForm(form);
  };
  const router = useRouter(); // Use the useRouter hook

  const handleGoogleLogin = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Failed to sign in with Google.", error);
    }
  }, [router]);

  const handleLogin = useCallback(async event => {
    event.preventDefault();
    const { loginEmail, loginPassword } = event.target.elements;
    try {
      await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
      // Handle successful login
      router.push('/');
    } catch (error) {
      console.log(error);
      alert("Wrong email or password.", error);
    }
  }, [router]);

  const handleSignUp = useCallback(
	async (event) => {
	  event.preventDefault();
	  const { signupEmail, signupPassword, signupPasswordConfirm, signupUsername, signupTag, signupAvatar } = event.target.elements;
  
	  if (signupPassword.value !== signupPasswordConfirm.value) {
		alert("Passwords do not match.");
		return;
	  }
  
	  try {
		let avatarUrl = null;
		if (signupAvatar.files && signupAvatar.files[0]) {
		  const avatarRef = ref(storage, `avatars/${signupAvatar.files[0].name}`);
		  await uploadBytes(avatarRef, signupAvatar.files[0]);
		  avatarUrl = await getDownloadURL(avatarRef);
		}
  
		const response = await createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value);
  
		await setDoc(doc(db, "users", response.user.uid), {
			email: signupEmail.value,
			username: signupUsername.value,
			tag: signupTag.value,
			avatar: avatarUrl,
		});

		// Send form data to backend
		const token = await response.user.getIdToken(); // Get the user's ID token
		await axios.post(`${BACKEND_URL}/user`, {
		  email: signupEmail.value,
		  username: signupUsername.value,
		  tag: signupTag.value,
		}, {
		  headers: {
		    Authorization: `Bearer ${token}`, // Add the token to the Authorization header
		  },
		});

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
				<button type="button" className={`${styles.btnGoogleLogin}`} onClick={handleGoogleLogin}>
				Login with Google
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
					<label htmlFor="signupTag">Tag</label>
					<input id="signupTag" type="text" required />
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
