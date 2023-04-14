import { useState, useContext, useEffect} from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../../components/FirebaseContext';
import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';
import Profile from '../profile/index';
import Widgets from '@/components/Widgets';
import Head from 'next/head';
import UserContext from '../../components/UserContext';
import Input from '@/components/Input';
import {idToken} from '@/components/useUserToken';
import NewUserForm from '@/components/NewUserForm';

export default function Home({ newsResults }) {

  const currentContext = useContext(UserContext);
  console.log(idToken);
  const { user, loading, logout } = useUser();
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [isNewUser, setIsNewUser] = useState(router && router.query && router.query.isNewUser === 'true');

  const handleUserDetailsSubmit = (userId, tag) => {
    // Save the userId and tag to the database
    // ...

    // Once the data is saved, set isNewUser to false
    setIsNewUser(false);
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="CSCI3100 PROJECT" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/tertwit_T.ico" />
      </Head>
      <main className="flex min-h-screen max-w-7xl mx-auto ">
        {isNewUser ? (
          <NewUserForm user={user} onUserDetailsSubmit={handleUserDetailsSubmit} />
        ) : (
          <>
            <Sidebar setShowProfile={setShowProfile} />
            {showProfile ? (
              <Profile user={user} setShowProfile={setShowProfile} token={''} loading={false} />
            ) : (
              <>
                <div className="flex-col justify-center w-full">
                  <Feed />
                  <Input />
                </div>
              </>
            )}
            <div className="right-section">
              {/* <Chatlist /> */}
              {/* Widgets */}
              <Widgets newsResults={newsResults.articles} />
            </div>
          </>
        )}
      </main>
    </>
  );
}

// Along with Widgets component
//newsResults in props
//https://saurav.tech/NewsAPI/everything/cnn.json

export async function getServerSideProps() {
  const newsResults = await fetch('https://saurav.tech/NewsAPI/everything/bbc-news.json').then(res => res.json())
  return {
    props: {
      newsResults
    }
  }
}
//End of Widgets
