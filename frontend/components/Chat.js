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
import React, { useContext, useEffect,useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import ChatSearch from "@/components/ChatSearch";
import { db } from "@/components/firebase";
import { AuthContext } from "@/components/ChatuserContext";
import {idToken} from  "@/components/useUserToken";
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router'
import axios from 'axios';
import { useUser } from "../components/FirebaseContext";
const user = {
    username: function(){
        return this.username 
    }

    ,usericon: function(){
        return this.avatar
    }

    ,usertag: function(){
        return this.tag
    }
}


let CurrentUser ={
    userId:1,
    username:"DuenNG",
    tag:"@littleDuen",
    avatar: "./cat.jpg",
    following:[123,234],
    follower:[123,234,456],
    token:"abc",
    isAdmin:false
  }

let testUser2 ={
    userId:1,
    username:"test2",
    tag:"@test2",
    avatar:null,
    following:[],
    follower:[],
    token:"fff",
    isAdmin:false
  }

function Chat() {




return (

<div className="flex">

    <div className="w-1/5 h-screen bg-gray-100">

        <div className="text-[20px] p-3  font-bold">Chats</div>
        <div> <ChatSearch/></div>

        <div className="flex m-3 overflow-auto">
            <div className="p-2 flex justify-center items-center flex-col">
                <img className="w-10 h-10 rounded-full" src="./1.jpg"/>
                <div className="text-gary-500 text-xs pt-1 text-center">Mentigay</div>
            </div>
            <div className="p-2 flex justify-center items-center flex-col">
                <img className="w-10 h-10 rounded-full" src="./2.jpg"/>
                <div className="text-gary-500 text-xs pt-1 text-center">Callum</div>
            </div>
            <div className="p-2 flex justify-center items-center flex-col">
                <img className="w-10 h-10 rounded-full" src="./3.jpg"/>
                <div className="text-gary-500 text-xs pt-1 text-center">Michael</div>
            </div>
            <div className="p-2 flex justify-center items-center flex-col">
                <img className="w-10 h-10 rounded-full" src="./4.jpg"/>
                <div className="text-gary-500 text-xs pt-1 text-center">Richard</div>
            </div>
            <div className="p-2 flex justify-center items-center flex-col">
                <img className="w-10 h-10 rounded-full" src="./usericon.jpg"/>
                <div className="text-gary-500 text-xs pt-1 text-center">Alexander</div>
            </div>
            <div className="p-2 flex justify-center items-center flex-col">
                <img className="w-10 h-10 rounded-full" src="./usericon.jpg"/>
                <div className="text-gary-500 text-xs pt-1 text-center">Thomas</div>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-x-0 gap-y-0 m-3 ">
                <button type="submit">
                    <div className="flex m-3 bg-white rounded-md p-2  text-gray-700 hoverEffect">
                        <div>
                            <img className="w-14 h-14 rounded full" src="./1.jpg"/>
                        </div>
                        <div className="flex-grow p-3">
                            <div className="flex text-xs justify-between">
                                <div>Mentigay</div>
                                <div className="text-gray-400">13:28 PM</div>
                            </div>
                            <div className="text-xs text-gray-400">Go lunch? So Hungry</div>
                        </div>
                    </div>
                </button>
                
                <button type="submit">
                    <div className="flex m-3 bg-white rounded-md p-2  text-gray-700 hoverEffect">
                        <div>
                            <img className="w-14 h-14 rounded full" src="./2.jpg"/>
                        </div>
                        <div className="flex-grow p-3">
                            <div className="flex text-xs justify-between">
                                <div>Callum</div>
                                <div className="text-gray-400">13:02 PM</div>
                            </div>
                            <div className="text-xs text-gray-400">Oh Yeah! Come on</div>
                        </div>
                    </div>
                </button>
                <button type="submit">
                    <div className="flex m-3 bg-white rounded-md p-2  text-gray-700 hoverEffect">
                        <div>
                            <img className="w-14 h-14 rounded full" src="./3.jpg"/>
                        </div>
                        <div className="flex-grow p-3">
                            <div className="flex text-xs justify-between">
                                <div>Michael</div>
                                <div className="text-gray-400">12:00 AM</div>
                            </div>
                            <div className="text-xs text-gray-400">Hey you! Yeah you!</div>
                        </div>
                    </div>
                </button>
                <button type="submit">
                        <div className="flex m-3 bg-white rounded-md p-2  text-gray-700 hoverEffect">
                            <div>
                                <img className="w-14 h-14 rounded full" src="./4.jpg"/>
                            </div>
                            <div className="flex-grow p-3">
                                <div className="flex text-xs justify-between">
                                    <div>Richard</div>
                                    <div className="text-gray-400">7:23 AM</div>
                                </div>
                                <div className="text-xs text-gray-400">Will you marry me?</div>
                            </div>
                        </div>
                </button> 
            
        </div>
    </div>


    <div className="flex-grow h-screen flex flex-col">
        <div className=" w-full h-30 flex justify-between bg-green-100">
            <div className="flex items-center">
                <div className="p-3">
                    <img className="w-14 h-14 rounded-full" src={user.usericon.call(CurrentUser)}/>
                </div> 
                <div className="p-3">
                    <div className="text-sm">{user.username.call(CurrentUser)}</div>
                    <div className="text-xs">{user.usertag.call(CurrentUser)}</div>    
                </div> 
            </div>
        </div>

        <div className="overflow-auto">
            <div className=" w-full h-screen flex-glow bg-blue-100 overflow-auto">
                <div className="flex items-end w-3/6 bg-gray-100 m-8 rounded-md">
                    <img className="w-10 h-10 rounded-full m-3" src={user.usericon.call(CurrentUser)} alt="" />
                    <div className="p-3">
                        <div className="text-sm" >
                        {user.username.call(CurrentUser)}
                        </div>
                        <div className="text-xs text-gray-500">
                        Once upon a time there was an old mother pig who had three little pigs and not enough food to feed them. So when they were old enough, she sent them out into the world to seek their fortunes.
                        The first little pig was very lazy. He didn't want to work at all and he built his house out of straw. The second little pig worked a little bit harder but he was somewhat lazy too and he built his house out of sticks. Then, they sang and danced and played together the rest of the day.
                        </div>
                        <div className="text-xs text-gray-400"> 19 minutes ago</div>
                    </div>           
                </div>

                <div className="flex justify-end">
                    <div className="flex justify-between w-3/6 bg-blue-600 m-8 rounded-md">
                        
                        <div className="p-5">
                            <div className="text-xs text-gray-100">The third little pig worked hard all day and built his house with bricks. It was a sturdy house complete with a fine fireplace and chimney. It looked like it could withstand the strongest winds.

The next day, a wolf happened to pass by the lane where the three little pigs lived; and he saw the straw house, and he smelled the pig inside. He thought the pig would make a mighty fine meal and his mouth began to water.</div>
                            <div className=" flex items-end text-xs text-gray-200"> 8 minutes ago</div>
                        </div>     
                        <img className="w-10 h-10 rounded-full m-6" src="./usericon.jpg" alt="" />
                        
                    </div>
                </div>

                <div className="flex items-end w-3/6 bg-gray-100 m-8 rounded-md">
                    <img className="w-10 h-10 rounded-full m-3" src={user.usericon.call(CurrentUser)} alt="" />
                    <div className="p-3">
                        <div className="text-sm" >
                        {user.username.call(CurrentUser)}
                        </div>
                        <div className="text-xs text-gray-500">
                        So he huffed and he puffed and he blew the house down! The wolf opened his jaws very wide and bit down as hard as he could, but the first little pig escaped and ran away to hide with the second little pig.

The wolf continued down the lane and he passed by the second house made of sticks; and he saw the house, and he smelled the pigs inside, and his mouth began to water as he thought about the fine dinner they would make.

So he knocked on the door and said:

  Little pigs! Little pigs!
  Let me in! Let me in!
                        </div>
                        <div className="text-xs text-gray-400"> 19 minutes ago</div>
                    </div>           
                </div>

            </div>
        </div>

        <div className=" w-full h-14 flex px-3 bg-red-100">
            <input placeholder="Start a new message..." type="text" className="flex-grow focus:outline-none "/>
            <div className =" rounded-full w-5 h-5 flex justify-between">
                <button type="submit">
                    <img src="./sent.png" className="w-5 h-5 m-2"/>
                </button>
            </div>
        </div>
    </div>

</div>



);
};

export default Chat;
