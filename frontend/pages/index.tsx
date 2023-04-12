import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../components/UserContext";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Trending from "@/components/Trending";
import Suggestions from "@/components/Suggestions";
import Chat from "@/components/Chat";
import Chatlist from "@/components/Chatlist";
import Chatroom from "@/components/Chatroom";

export default function Home() {
  const { user, loading } = useUser(); // Destructure user and loading
  const router = useRouter();

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
        <div className="left-section flex"> {/* Add this container */}
          <Sidebar />
          <Feed />
        </div>
        <div className="right-section">
          <Trending />
          <Suggestions />
        </div>
      </div>
    </div>
  );
}
