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
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null; // Render nothing until the user status is checked
  }

  return (
    <div className="container">
      <div className="main-content flex">
        <Sidebar />
        <Feed />
        <div className="right-section">
          <Trending />
          <Suggestions />
        </div>
      </div>
    </div>
  );
}
