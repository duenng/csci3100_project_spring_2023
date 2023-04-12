import React, { useState, createContext, useReducer, useEffect, useContext } from 'react';
import { auth } from '../components/firebase'; // Import auth from firebase
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged from firebase/auth
export const AuthContext = createContext();

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = user.uid; // Use user's uid as a unique token
        dispatch({ type: 'setUser', payload: { user, token } });
      } else {
        dispatch({ type: 'setUser', payload: { user: null, token: null } });
      }
    });
  
    // Clean up the listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser); // Set the user state to the logged-in Firebase user
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Unsubscribe from the auth state changes when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    await auth.signOut(); // Sign out the user from Firebase
    setUser(null);
  };

  return { user, loading, logout };
};