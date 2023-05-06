import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Chat from "@/components/Chat.js";

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
      
      <div className=" h-screen">
      <div className='grid grid-cols-10 w-screen h-screen'>
        <div className=' col-span-2 h-screen'>
          <Sidebar />
        </div>

        <div className='col-span-8 h-screen '>
          <Chat/>
        </div>
      </div>
      </div>
  );
}
