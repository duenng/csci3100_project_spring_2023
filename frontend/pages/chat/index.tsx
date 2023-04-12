import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import SidebarforChat from '@/components/SidebarforChat'
import Login from '@/components/Login'
import Feed from "@/components/Feed";
import Trending from "@/components/Trending";
import Suggestions from "@/components/Suggestions";
import {AuthContextProvider} from '@/components/UserContext';
import Chatlist from "@/components/Chatlist";
import Chatroom from "@/components/Chatroom";
import Chat from "@/components/Chat";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className=" h-screen">
    <div className='grid grid-cols-10 w-screen h-screen'>
      <div className=' col-span-2 h-screen'>
        <SidebarforChat/>
      </div>

      <div className='col-span-8 h-screen '>
        <Chat/>
      </div>
    </div>
    </div>
  );
}
