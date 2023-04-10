import Image from "next/image";
import SideBarMenuItem from "./SideBarMenuItem";
import {HomeIcon} from "@heroicons/react/solid";
import {BellIcon, InboxIcon, UserIcon, DotsCircleHorizontalIcon, DotsHorizontalIcon} from "@heroicons/react/outline";

function Sidebar() {
  return (
    <div>
      {/* Tertwit Logo */}
      {/* to be added, hover effect to the logo */}
      <div style={{display:'flex'}} className="hoverElement">
        <Image src="/tertwit_logo.svg"
        alt="Logo"
        width={75}
        height={75}
        >
        </Image>
      </div>
      {/* Menu */}
      <div className="">
        <SideBarMenuItem text="Home" Icon={HomeIcon} active />
        <SideBarMenuItem text="Notification" Icon={BellIcon}/>
        <SideBarMenuItem text="Messages" Icon={InboxIcon}/>
        <SideBarMenuItem text="Profile" Icon={UserIcon}/>
        <SideBarMenuItem text="Setting" Icon={DotsCircleHorizontalIcon}/>
      </div>  


      {/* Tertwit Button */}
      <div className="inline-onlarge"><button className="button-bg-theme text-white rounded-full font-bold shadow-md " style={{width:200, height:50}}>Creat a Post</button>
      </div>

      {/* User Profile */}

      <div style={{display:'flex'}} className="items-center justify-center text-gray-700 hoverElement justify-start-onlarge" >
        {/* User Profile Picture, Need to import from database*/}
        <img
			src="/usericon.jpg"
			alt="Profile Picture"
			className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full"
		/>
        <div className="">
        {/* User Name, Need to import from database*/}
          <h4 style={{padding:0, margin:0}}>Username</h4>
          <p style={{padding:0, margin:0}}>@username</p>
        </div>
        <DotsHorizontalIcon className="h-5"/>
      </div>
    </div>
  )
}

export default Sidebar