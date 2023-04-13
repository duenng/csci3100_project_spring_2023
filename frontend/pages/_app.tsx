// pages/_app.js
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import "../styles/globals.css";
import '../styles/tailwind.css';
import { AuthContextProvider } from "../components/FirebaseContext"; // Import the UserProvider
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/firebase';
import UserContext from "../components/UserContext";
function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <AuthContextProvider value={{ user }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
      </AuthContextProvider>
      <style jsx global>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .flex {
          display: flex;
        }

        .main-content {
          display: flex;
          justify-content: space-between;
        }

        .right-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
		.left-section {
          display: flex;
          justify-content: flex-start;
          gap: 1rem;
        }
      `}</style>
    </>
  );
}

export default MyApp;
