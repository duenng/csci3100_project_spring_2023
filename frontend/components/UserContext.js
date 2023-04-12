import React, { createContext, useReducer, useEffect, useContext } from 'react';
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
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a AuthContextProvider');
  }
  return context;
};
