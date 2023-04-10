import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Add any logic for fetching or updating the currentUser here.

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};