import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { auth } from './firebase';
import {AuthContext} from "./UserContext";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        // Use the 'value' property to get input values
        const result = await auth.signInWithEmailAndPassword(email.value, password.value);
        history.push("/"); // Redirect to the home page upon successful login
      } catch (error) {
        console.error("Error signing in:", error);
      }
    },
    [history]
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
