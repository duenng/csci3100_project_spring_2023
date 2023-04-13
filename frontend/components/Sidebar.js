import Image from "next/image";
import SideBarMenuItem from "./SideBarMenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  InboxIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  LogoutIcon, // Import the LogoutIcon (replace with an appropriate icon)
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import { useUser } from "../components/UserContext";
import { set } from "date-fns";
import PopUpCreate from './PopUpCreatePost';


function Sidebar({setShowProfile }) {
  const { user, loading, logout } = useUser(); // Destructure user, loading, and logout function
  const [showPop,setShowPop] = useState(false)
  const router = useRouter();

  //active variable
  const [isHomeActive, setIsHomeActive] = useState(true);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isMessageActive, setIsMessageActive] = useState(false);
  const [isSettingActive, setIsSettingActive] = useState(false);



  
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }


  const handleFront = () => {
    console.log("Front clicked!");
    /* setIsHomeActive(true); // Set "Home" as active
    setIsMessageActive(false);
    setIsProfileActive(false);
    setIsSettingActive(false); */
    router.push("/");
  };

  const handleMessagesClick = () => {
    console.log("Messages clicked!");
    /* setIsMessageActive(true); // Set "Messages" as active
    setIsHomeActive(false);
    setIsProfileActive(false);
    setIsSettingActive(false); */
    router.push('/chat')
  };


  const handleProfileClick = () => {
    console.log("Profile clicked!");
   /*  setIsProfileActive(true); // Set "Profile" as active
    setIsHomeActive(false);
    setIsMessageActive(false);
    setIsSettingActive(false); */
    setShowProfile(true);
  };

  const handleSettingClick = () => {
    console.log("Setting clicked!");
    /* setIsSettingActive(true); // Set "Setting" as active
    setIsHomeActive(false);
    setIsMessageActive(false);
    setIsProfileActive(false); */
    router.push('/setting')
  };

  const handleLogoutClick = () => {
    console.log("Logout clicked!");
    logout();
  };

  return (
    <>
      <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-12">
      <div className="px-1.5 hoverEffect p-4 hover:bg-purple-100 xl:px-4 xl:items-start" onClick={handleFront}>
        <h1 className="text-xs font-extrabold text-purple-500 xl:text-3xl">Tertwit</h1>
      </div>

      {/* Menu */}
      <div className="mt-4 mb-3 xl:items-start">
        <div onClick={handleFront}>
          <SideBarMenuItem text="Home" Icon={HomeIcon} active={isHomeActive}/>
        </div>
        <SideBarMenuItem text="Notification" Icon={BellIcon} />
        <SideBarMenuItem text="Messages" Icon={InboxIcon} onClick={handleMessagesClick} active={isMessageActive}/>
        <SideBarMenuItem text="Profile" Icon={UserIcon} onClick={handleProfileClick} active={isProfileActive} />
        <SideBarMenuItem text="Setting" Icon={DotsCircleHorizontalIcon} onClick={handleSettingClick} active={isSettingActive}/>
        <SideBarMenuItem text="Logout" Icon={LogoutIcon} onClick={handleLogoutClick} />
      </div>

      {/* Tertwit Button */}
      <button className="bg-purple-500 text-white hover:brightness-95 rounded-full w-56 h-12 font-bold shadow-md text-lg hidden xl:inline"
        onClick={()=>setShowPop(true)}>
        Create a Post
      </button>
     
      {/* User Profile */}
      <div className="flex items-center justify-center text-gray-700 hoverEffect xl:justify-start mt-auto">
        <img
          src="/usericon.jpg"
          alt="Profile Picture"
          className="h-10 w-10 rounded-full xl:mr-2"
        />
        <div className="hidden xl:inline leading-5">
          {/* User Name, Need to import from database*/}
          <h4 className="font-bold">Username</h4>
          <p className="text-gray-500">@username</p>
        </div>
        <DotsHorizontalIcon className="h-5 xl:m1-8 xl:inline hidden" />
      </div>
    </div>
     {showPop?<PopUpCreate user={user} url={""} handler={()=>setShowPop(false)}/>:null}
    </>
    

  );
}

export default Sidebar;
