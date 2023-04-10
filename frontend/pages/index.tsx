import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Login from '@/components/Login'
import Feed from "@/components/Feed";
import Trending from "@/components/Trending";
import Suggestions from "@/components/Suggestions";
import {AuthContextProvider} from '@/components/UserContext';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="container">
      <div className="main-content flex">
        <Sidebar />
        <Feed />
        <div className="right-section">
          <Trending />
		  <AuthContextProvider>
		  <Login />
		  </AuthContextProvider>
          <Suggestions />
        </div>
      </div>
    </div>
  );
}
