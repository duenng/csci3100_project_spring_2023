import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../components/UserContext";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Chatlist from "@/components/Chatlist";
import Profile from "@/components/Profile";

export default function Home() {
  const { user, loading, logout } = useUser(); // Destructure user, loading, and logout function
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="main-content flex">
        <div className="left-section flex">
          <Sidebar setShowProfile={setShowProfile} logout={logout} /> {/* Pass the setShowProfile and logout functions to the sidebar */}
        </div>
        <div className="middle-section">
          {showProfile ? (
            <Profile user={user} setShowProfile={setShowProfile} />
          ) : (
            <div>
              <Feed />
            </div>
          )}
        </div>
        <div className="right-section">
          <Chatlist />
        </div>
      </div>
    </div>
  );
}
