<<<<<<< Updated upstream
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../components/UserContext";
import Sidebar from "@/components/Sidebar";
=======
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
>>>>>>> Stashed changes
import Feed from "@/components/Feed";
import Trending from "@/components/Trending";
import Suggestions from "@/components/Suggestions";
import Chat from "@/components/Chat";
import Chatlist from "@/components/Chatlist";
import Chatroom from "@/components/Chatroom";
import Profile from "@/components/Profile";

export default function Home() {
  const { user, token, loading } = useUser(); // Destructure user and loading
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false); // Add state for showing the profile component

  useEffect(() => {
    if (!loading && !user) { // Only redirect if loading is false and user is null
      router.replace("/login"); // Use replace instead of push
    }
  }, [user, loading, router]); // Add loading to the dependency array

  if (loading) { // Render nothing until the user status is checked
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading component
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="main-content flex">
        <div className="left-section flex">
          <Sidebar setShowProfile={setShowProfile} /> {/* Pass the setShowProfile function to the sidebar */}
        </div>
        <div className="middle-section">
          {showProfile ? (
            <Profile user={user} setShowProfile={setShowProfile} />
          ) : (
            <div>
              <Feed />
              <Trending />
            </div>
          )}
        </div>
        <div className="right-section">
          <Suggestions />
          <Chatlist />
        </div>
      </div>
    </div>
  );
}