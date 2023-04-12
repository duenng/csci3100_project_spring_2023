import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { useUser } from "../components/UserContext";

interface User {
  displayName: string;
  // Add any other properties of the user object here
}

interface ProfileProps {
  user: User;
  token: string;
  loading: boolean;
  setShowProfile: (showProfile: boolean) => void;
}

export default function Profile({ user, token, loading, setShowProfile }: ProfileProps) {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  console.log("rendering Profile");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/api/userData?token=${token}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <p>This is your unique page with token: {token}</p>
      {userData && <p>User-specific data: {userData}</p>}
      <button onClick={() => setShowProfile(false)}>Close Profile</button>
    </div>
  );
}
