import Image from "next/image";
import SideBarMenuItem from "./SideBarMenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  InboxIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      <div className="px-1.5 hoverEffect p-4 hover:bg-purple-100 xl:px-4 xl:items-start">
        <h1 className="text-xs font-extrabold text-purple-500 xl:text-3xl">Tertwit</h1>
      </div>

      <div className="mt-4 mb-3 xl:items-start">
        <SideBarMenuItem text="Home" Icon={HomeIcon} active />
        <SideBarMenuItem text="Notifications" Icon={BellIcon} />
        <SideBarMenuItem text="Messages" Icon={InboxIcon} />
        <SideBarMenuItem text="Profile" Icon={UserIcon} />
        <SideBarMenuItem text="Settings" Icon={DotsCircleHorizontalIcon} />
      </div>

      <button className="bg-purple-500 text-white hover:brightness-95 rounded-full w-56 h-12 font-bold shadow-md text-lg hidden xl:inline">
        Create a Post
      </button>

      <div className="flex items-center justify-center text-gray-700 hoverEffect xl:justify-start mt-auto">
        <img
          src="/usericon.jpg"
          alt="Profile Picture"
          className="h-10 w-10 rounded-full xl:mr-2"
        />
        <div className="leading-5">
          <h4 className="font-bold">Username</h4>
          <p className="text-gray-500">@username</p>
        </div>
        <DotsHorizontalIcon className="h-5 xl:m1-8 " />
      </div>
    </div>
  );
}

export default Sidebar;
