// pages/_app.js
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import "../styles/globals.css";
import '../styles/tailwind.css';
import { UserProvider } from "../components/UserContext"; // Import the UserProvider

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider> {/* Wrap the UserProvider around your Component */}
        <Component {...pageProps} />
      </UserProvider>
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
      `}</style>
    </>
  );
}

export default MyApp;
