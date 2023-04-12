import Image from "next/image"
import SideBarMenuItem from "./SideBarMenuItem";
import { HomeIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  InboxIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

function Chat() {

return (
 
<div className="flex">

    <div className="w-1/5 h-screen bg-gray-100">

        <div className="text-[20px] p-3  font-bold">Chats</div>
        <div className="p-3 flex">
            <input 
                className="p-2 w-10/12 bg-gray-200 text-xs focus:outline-none rounded-tl-md rounded-bl-md"
                type="text"
                placeholder="Search for users..."/>
            <div className="w-2/12 flex justify-center items-center bg-gray-200 rounded-tr-md rounded-br-md">
                <img className="w-4" src="./search.png" />
            </div>
        </div>

        <div className="flex m-3 overflow-auto">
            <div className="p-2 flex justify-center items-center flex-col">
                <img className="w-10 h-10 rounded-full" src="./usericon.jpg"/>
                <div className="text-gary-500 text-xs pt-1 text-center">Username</div>
            </div>
            <div className="p-2 flex justify-center items-center flex-col">
                <img className="w-10 h-10 rounded-full" src="./usericon.jpg"/>
                <div className="text-gary-500 text-xs pt-1 text-center">Username</div>
            </div>
            <div className="p-2 flex justify-center items-center flex-col">
                <img className="w-10 h-10 rounded-full" src="./usericon.jpg"/>
                <div className="text-gary-500 text-xs pt-1 text-center">Username</div>
            </div>
            <div className="p-2 flex justify-center items-center flex-col">
                <img className="w-10 h-10 rounded-full" src="./usericon.jpg"/>
                <div className="text-gary-500 text-xs pt-1 text-center">Username</div>
            </div>
            <div className="p-2 flex justify-center items-center flex-col">
                <img className="w-10 h-10 rounded-full" src="./usericon.jpg"/>
                <div className="text-gary-500 text-xs pt-1 text-center">Username</div>
            </div>
            <div className="p-2 flex justify-center items-center flex-col">
                <img className="w-10 h-10 rounded-full" src="./usericon.jpg"/>
                <div className="text-gary-500 text-xs pt-1 text-center">Username</div>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-x-0 gap-y-0 m-3 ">
                <button type="submit">
                    <div className="flex m-3 bg-white rounded-md p-2  text-gray-700 hoverEffect">
                        <div>
                            <img className="w-14 h-14 rounded full" src="./usericon.jpg"/>
                        </div>
                        <div className="flex-grow p-3">
                            <div className="flex text-xs justify-between">
                                <div>Username</div>
                                <div className="text-gray-400">12:00 AM</div>
                            </div>
                            <div className="text-xs text-gray-400">This is the latest message.</div>
                        </div>
                    </div>
                </button>
                
                <button type="submit">
                    <div className="flex m-3 bg-white rounded-md p-2  text-gray-700 hoverEffect">
                        <div>
                            <img className="w-14 h-14 rounded full" src="./usericon.jpg"/>
                        </div>
                        <div className="flex-grow p-3">
                            <div className="flex text-xs justify-between">
                                <div>Username</div>
                                <div className="text-gray-400">12:00 AM</div>
                            </div>
                            <div className="text-xs text-gray-400">This is the latest message.</div>
                        </div>
                    </div>
                </button>
                <button type="submit">
                    <div className="flex m-3 bg-white rounded-md p-2  text-gray-700 hoverEffect">
                        <div>
                            <img className="w-14 h-14 rounded full" src="./usericon.jpg"/>
                        </div>
                        <div className="flex-grow p-3">
                            <div className="flex text-xs justify-between">
                                <div>Username</div>
                                <div className="text-gray-400">12:00 AM</div>
                            </div>
                            <div className="text-xs text-gray-400">This is the latest message.</div>
                        </div>
                    </div>
                </button>
                <button type="submit">
                        <div className="flex m-3 bg-white rounded-md p-2  text-gray-700 hoverEffect">
                            <div>
                                <img className="w-14 h-14 rounded full" src="./usericon.jpg"/>
                            </div>
                            <div className="flex-grow p-3">
                                <div className="flex text-xs justify-between">
                                    <div>Username</div>
                                    <div className="text-gray-400">12:00 AM</div>
                                </div>
                                <div className="text-xs text-gray-400">This is the latest message.</div>
                            </div>
                        </div>
                </button> 
            
        </div>
    </div>


    <div className="flex-grow h-screen flex flex-col">
        <div className=" w-full h-30 flex justify-between bg-green-100">
            <div className="flex items-center">
                <div className="p-3">
                    <img className="w-14 h-14 rounded-full" src="./usericon.jpg" />
                </div> 
                <div className="p-3">
                    <div className="text-sm">Username</div>
                    <div className="text-xs">online</div>    
                </div> 
            </div>
        </div>

        <div className="overflow-auto">
            <div className=" w-full h-screen flex-glow bg-blue-100 overflow-auto">
                <div className="flex items-end w-3/6 bg-gray-100 m-8 rounded-md">
                    <img className="w-10 h-10s rounded-full m-3" src="./usericon.jpg" alt="" />
                    <div className="p-3">
                        <div className="text-sm" >
                            Username
                        </div>
                        <div className="text-xs text-gray-500">
                            SUCK MY DICK DUEN!Use overflow-auto to add scrollbars to an element in the event that its content overflows the bounds of that element. Unlike overflow-scroll, which always shows scrollbars, this utility will only show them if scrolling is necessary.Use overflow-auto to add scrollbars to an element in the event that its content overflows the bounds of that element. Unlike overflow-scroll, which always shows scrollbars, this utility will only show them if scrolling is necessary.
                        </div>
                        <div className="text-xs text-gray-400"> 8 minutes ago</div>
                    </div>           
                </div>

                <div className="flex justify-end">
                    <div className="flex justify-between w-3/6 bg-blue-600 m-8 rounded-md">
                        
                        <div className="p-5">
                            <div className="text-xs text-gray-100">Oh Yeah! Come onUse overflow-auto to add scrollbars to an element in the event that its content overflows the bounds of that element. Unlike overflow-scroll, which always shows scrollbars, this utility will only show them if scrolling is necessary.!</div>
                            <div className=" flex items-end text-xs text-gray-200"> 8 minutes ago</div>
                        </div>     
                        <div className="">
                        <img className="w-10 h-10 rounded-full m-4" src="./usericon.jpg" alt="" />
                        </div> 
                    </div>
                </div>

            </div>
        </div>

        <div className=" w-full h-14 flex px-3 bg-red-100">
            <input placeholder="Start a new message..." type="text" className="flex-grow focus:outline-none "/>
            <div className =" rounded-full w-5 h-5 flex justify-between">
                <button type="submit">
                    <img src="./sent.png" class="w-5 h-5 m-2"/>
                </button>
            </div>
        </div>
    </div>

</div>



);
}

export default Chat;
