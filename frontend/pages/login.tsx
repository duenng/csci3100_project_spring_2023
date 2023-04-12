import { useState } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signIn = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push("/");
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={signIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;