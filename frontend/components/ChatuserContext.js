import React, { useState, createContext, useReducer, useEffect, useContext } from 'react';
import { auth } from '../components/firebase'; // Import auth from firebase
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged from firebase/auth


export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};