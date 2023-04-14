import Image from "next/image";
import SideBarMenuItem from "./SideBarMenuItem";
import { HomeIcon  } from "@heroicons/react/solid";
import {
  BellIcon,
  InboxIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  LogoutIcon,
  MoonIcon,
  SunIcon, // Import the LogoutIcon (replace with an appropriate icon)
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import { useUser } from "../components/FirebaseContext";
import { set } from "date-fns";
import PopUpCreate from './PopUpCreatePost';
import axios from "axios";

//dark mode
//import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
//end dark mode




function Sidebar({setShowProfile }) {
  //dark mode
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

/*   if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme; */
  //end dark mode


  const [showPop,setShowPop] = useState(false)
  const { user, loading, logout } = useUser(); // Destructure user, loading, and logout function
  const router = useRouter();
  const [currentUser,setCurrentUser] = useState(null)


  //active variable
  const [isHomeActive, setIsHomeActive] = useState(true);
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isMessageActive, setIsMessageActive] = useState(false);
  const [isSettingActive, setIsSettingActive] = useState(false);
  

  const handleUser = async (uid)=>{
    console.log(uid)
    let {data} = await axios.get(`http://${window.location.hostname}:3001/user/token/${uid}`)
    console.log(data)
    return data
  }

  useEffect(() => {
    if(user){
      console.log(user.uid)
      handleUser(user.uid).then((user)=>{
        if(user){
          console.log(user)
          setCurrentUser(user)
        }
      })
    }
    //dark mode
    setMounted(true);
    //dark mode
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);
    
  //dark mode
  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;
  //dark mode
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  //dark Mode
  const handleDarkMode = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const handleFront = () => {
    console.log("Front clicked!");
    /* setIsHomeActive(true); // Set "Home" as active
    setIsMessageActive(false);
    setIsProfileActive(false);
    setIsSettingActive(false); */
    router.push("/");
  };

  const handleNotification = () => {
    console.log("Notification clicked!");
    /* setIsNotificationActive(true); // Set "Noti" as active
    setIsMessageActive(false);
    setIsProfileActive(false);
    setIsSettingActive(false); */
    router.push("/notification");
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
    //setShowProfile(true);
    router.push('/profile')
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
        <SideBarMenuItem text="Notification" Icon={BellIcon} onClick={handleNotification} active={isNotificationActive}/>
        <SideBarMenuItem text="Messages" Icon={InboxIcon} onClick={handleMessagesClick} active={isMessageActive}/>
        <SideBarMenuItem text="Profile" Icon={UserIcon} onClick={handleProfileClick} active={isProfileActive} />
        <SideBarMenuItem text="Setting" Icon={DotsCircleHorizontalIcon} onClick={handleSettingClick} active={isSettingActive}/>
        <SideBarMenuItem text="Logout" Icon={LogoutIcon} onClick={handleLogoutClick} />
        {/* dark mode */}
        <SideBarMenuItem text={currentTheme === 'dark' ? "Light Mode" : "Dark Mode"}
        Icon={currentTheme === 'dark' ? SunIcon : MoonIcon} onClick={handleDarkMode} />
        {/* dark mode */}
        
          
     


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
          <h4 className="font-bold">{currentUser?currentUser.username:"loading"}</h4>
          <p className="text-gray-500">{currentUser?currentUser.tag:"loading"}</p>
        </div>
        <DotsHorizontalIcon className="h-5 xl:m1-8 xl:inline hidden" />
      </div>
    </div>
     {showPop?<PopUpCreate user={currentUser} url={""} handler={()=>setShowPop(false)}/>:null}
    </>
    

  );
}

export default Sidebar;
