import React, { createContext, useState, useEffect } from 'react';
import { auth } from '@/components/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/components/firebase';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [tag, setTag] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setEmail(user.email);

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username);
          setTag(userData.tag);
        }
      } else {
        setUser(null);
        setUsername(null);
        setEmail(null);
        setTag(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, username, setUsername, email, setEmail, tag, setTag }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
