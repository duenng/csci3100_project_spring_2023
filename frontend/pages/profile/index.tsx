import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";

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
  const [userPosts, setUserPosts] = useState([]);

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

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const response = await fetch(`/api/userPosts?token=${token}`);
        const data = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserPosts();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  return (
    <>
      <main className="flex min-h-screen max-w-7xl mx-auto ">
        <div className="flex-grow">
          <h1>Welcome, {user.displayName}</h1>
          <p>This is your unique page with token: {token}</p>
          {userData && (
            <div>
              <h2>User Information</h2>
              <p>Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
              <p>Location: {userData.location}</p>
            </div>
          )}
        </div>
        <div className="flex-none">
          {user.icon && (
            <img src={user.icon} alt="User Icon" className="w-16 h-16 rounded-full" />
          )}
        </div>
      </main>
      <div>
        <h2>Your Posts</h2>
        {userPosts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
        <button onClick={() => setShowProfile(false)}>Close Profile</button>
      </div>
    </>
  );
}
