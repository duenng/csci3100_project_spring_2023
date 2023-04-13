import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../components/UserContext";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Profile from "@/components/Profile";
import Widgets from "@/components/Widgets";
import Head from "next/head";
import Input from "@/components/Input";

export default function Home({newsResults}) {
  const { user, loading, logout } = useUser(); // Destructure user, loading, and logout function
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);


  return (
    <>
    <Head>
        <title>Home</title>
        <meta name="description" content="CSCI3100 PROJECT" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/tertwit_T.ico" />
    </Head>
    <main className="flex min-h-screen max-w-7xl mx-auto ">
          {/* <Sidebar /> */}
          <Sidebar setShowProfile={setShowProfile}/> {/* Pass the setShowProfile and logout functions to the sidebar */}
          {showProfile ? (
            <Profile user={user} setShowProfile={setShowProfile} token={""} loading={false} />
          ) : (
          <>
          <Feed />
          <Input />
          </>

          )}

        <div className="right-section">
          {/* <Chatlist /> */}
          {/* Widgets */}
          <Widgets newsResults={newsResults.articles}/>
        </div>
     
    </main>
    </>
  );
}

// Along with Widgets component
//newsResults in props
//https://saurav.tech/NewsAPI/everything/cnn.json

export async function getServerSideProps() {
  const newsResults = await fetch('https://saurav.tech/NewsAPI/everything/bbc-news.json').then(res => res.json())
  return {
    props: {
      newsResults
    }
  }
}
//End of Widgets
