import React, { useState, useCallback, useContext } from "react";
import styles from "../../styles/login.module.css";
import { useRouter } from 'next/router';
import { auth } from '../../components/firebase';
import { getAdditionalUserInfo, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../components/firebase";
import { storage } from '../../components/firebase';
import { getDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import axios from 'axios'; // or import fetch from 'node-fetch';
const BACKEND_URL = 'http://localhost:3001'; // Replace with your actual backend URL

const Login = () => {
  const [activeForm, setActiveForm] = useState("login");
  const [avatar,setAvatar] = useState(null)
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [uploadingA,setUploadingA] = useState(false)

  const handleAvatar =({target})=>{
	if(!target.files){
		return
	}
	setAvatar(target.files[0]);
	setPreviewAvatar(URL.createObjectURL(target.files[0]));
  }

  const uploadAvatar = async()=>{
		setUploadingA(true);
        try {
            const formData = new FormData();
            formData.append("myAvatar", avatar);
            const { data } = await axios.post("/api/avatar", formData);
			setUploadingA(false);
            return data.data["myAvatar"]["newFilename"]
        } catch (error) {
            console.log(error.response?.data);
            setUploadingA(false);
            return null
        }
  }



  const handleFormSwitch = (form) => {
    setActiveForm(form);
  };
  const router = useRouter(); // Use the useRouter hook

  const handleGoogleLogin = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // Check if user already exists
      const isNewUser = getAdditionalUserInfo(result).isNewUser;

      console.log("isNewUser", isNewUser);

      // Pass the isNewUser value to the Home component via a query parameter
      router.push({
        pathname: "/",
        query: { isNewUser: isNewUser },
      });
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
		
		const response = await createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value);


		// Send form data to backend
		const token = await response.user.getIdToken(); // Get the user's ID token

		let avatarName =""
		if(token){
			avatarName = await uploadAvatar()
		}
		let {data} = await axios.post(`${BACKEND_URL}/user`, {
		  username: signupUsername.value,
		  token: token,
		  tag: signupTag.value,
		  avatar: avatarName
		});

		await setDoc(doc(db, "users", response.user.uid), {
			email: signupEmail.value,
			username: signupUsername.value,
			tag: signupTag.value,
			avatar: avatarName,
			uid: data.userId
		  });
		
		console.log(response.user);
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
				<div className="flex justify-center m-4">
				{previewAvatar?<img src={previewAvatar} alt="Preview" className="h-24 max-w-24 rounded-full" />:null}
				</div>
				<div className="flex justify-center">
					<input id="signupAvatar" type="file" accept="image/*" hidden onChange={(e)=>handleAvatar(e)}/>
					<button type="button"className="" onClick={() => document.getElementById('signupAvatar').click()}>Upload your avatar</button>
				</div>
				</fieldset>
				<button disabled={uploadingA} type="submit" className={`${styles.btnSignup}`}>
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
