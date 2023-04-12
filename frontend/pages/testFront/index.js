import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import FrontPage from '../../components/FrontPage';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (

    <div className='grid grid-cols-4 gap-2 w-screen'>
      <div className=' overflow-y-scroll  h-screen'>
        <Sidebar/>
      </div>

      <div className='col-span-3 border-x-4  h-screen overflow-y-scroll overflow-x-hidden break-words'>
       <FrontPage/>
      </div>
    </div>
  );
}
