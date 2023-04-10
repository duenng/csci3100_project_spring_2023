import React, { useCallback, useContext } from "react";
import { useRouter } from 'next/router'; // Import useRouter
import { auth } from '@/components/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "@/components/UserContext";

const Login = () => {
  const router = useRouter(); // Use the useRouter hook

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        const result = await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/'); // Use the router.push method instead of history.push
      } catch (error) {
        alert("Hello! I am an alert box!!");
      }
    },
    [router] // Add router to the dependency array
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
