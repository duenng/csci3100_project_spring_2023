import React, { useState, useEffect } from 'react';
import NotificationItem from '../../components/NotificationItem';
import Head from 'next/head';
import Sidebar from '@/components/Sidebar';
import Widgets from '@/components/Widgets';
import Notification from '@/components/Notification';

export default function Notifications ({newsResults}){
  const [notifications, setNotifications] = useState([]);
  

  useEffect(() => {
    // Fetch notifications from API or other data source
    const fetchNotifications = async () => {
      try {
        // Fetch notifications data from API
        const response = await fetch('/api/notifications'); // Replace with your API endpoint
        const data = await response.json();
        setNotifications(data.notifications); // Set notifications data to state
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <>
    <Head>
        <title>Notifications</title>
        <meta name="description" content="CSCI3100 PROJECT" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/tertwit_T.ico" />
    </Head>
    <main className="flex min-h-screen max-w-7xl mx-auto ">
    <Sidebar setShowProfile={undefined}/>
    <div>
      <Notification /> 
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} /> // Render each notification item using NotificationItem component
      ))}
    </div>
    <div className="w-[200px] sm:block md:w-[400px] hidden space-y-5 lg:ml-8 ml-4 md:inline py-4"> 
        <Widgets newsResults={newsResults.articles}/>
      </div>
    </main>


    </>
  );
  
};



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
  //End of Widgetss