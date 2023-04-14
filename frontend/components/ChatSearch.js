import React, { useContext, useState } from "react";
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
import { db } from "@/components/firebase";
import { AuthContext } from "@/components/ChatuserContext";


const ChatSearch = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    

    const handleSearch = async () => {
        const q = query(
          collection(db, "users"),
          where("username", "==", username)
        );
        console.log(username);

        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
        } catch (err) {
          setErr(true);
        }
    };
     
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats" , combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            avatar: user.uid,
            displayName: user.username,
            photoURL: user.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.username,
            photoURL: currentUser.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
    };

    return(
    <div className="search">
            <div className=" searchFror p-3 flex">
                <input 
                    className="p-2 w-10/12 bg-gray-200 text-xs focus:outline-none rounded-tl-md rounded-bl-md"
                    type="text"
                    placeholder="Search for users..."
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    
                />
                <div className="w-2/12 flex justify-center items-center bg-gray-200 rounded-tr-md rounded-br-md">
                <img className="w-4" src="./search.png" />
            </div>
                </div>
            {err && <span>User not found!</span>}
            {user && (
                <div className="userChat" onClick={handleSelect}>
                  <div className="p-2 flex justify-center items-center flex-col">
                  <img className="w-10 h-10 rounded-full" src={ `avatar/${user.avatar?user.avatar:"user.png"}`} alt="" />
                  <div className="userChatInfo text-gary-500 text-xs pt-1 text-center">
                      <span>{user.username}</span>
                      <span>{user.userid}</span>
                  </div>
                  </div>
                </div>
            )}
    </div>
    );

};






export default ChatSearch;