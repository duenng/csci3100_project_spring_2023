// components/useUserToken.js
import { useState, useEffect, useContext } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const useUserToken = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        console.log('ID Token fetched:', idToken); // Add this line
        setToken(idToken);
      } else {
        setToken(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return token;
};

export default useUserToken;
