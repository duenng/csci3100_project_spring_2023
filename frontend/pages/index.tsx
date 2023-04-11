import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Feed from "@/components/Feed";
import Trending from "@/components/Trending";
import Suggestions from "@/components/Suggestions";
import {AuthContextProvider} from '@/components/UserContext';
import Chat from "@/components/Chat";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="container">
      <div className="main-content flex">
        <Sidebar />
        <Feed />
        <Chat />
        <div className="right-section">
          <Trending />
		  <AuthContextProvider>
		  </AuthContextProvider>
          <Suggestions />
        </div>
      </div>
    </div>
  );
}
