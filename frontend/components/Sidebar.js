import Image from "next/image";
import SideBarMenuItem from "./SideBarMenuItem";
import {HomeIcon} from "@heroicons/react/solid";
import {BellIcon, InboxIcon, UserIcon, DotsCircleHorizontalIcon, DotsHorizontalIcon} from "@heroicons/react/outline";

function Sidebar() {
  return (
    <div>
      {/* Tertwit Logo */}
      {/* to be added, hover effect to the logo */}
      <div className="hoverElement">
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

      <div className="hoverElement ">
        {/* User Profile Picture, Need to import from database*/}
        <img className="rounded-full " src="/usericon.jpg" alt="Profile Picture" width={75} height={75} />
        <div className="">
        {/* User Name, Need to import from database*/}
          <h4>Username</h4>
          <p>@username</p>
        </div>
        <DotsHorizontalIcon className="h-5"/>
      </div>
    </div>
  )
}

export default Sidebar