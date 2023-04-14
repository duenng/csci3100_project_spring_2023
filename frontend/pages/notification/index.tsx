import React, { useState, useEffect } from 'react';
import NotificationItem from '../../components/NotificationItem';
import Head from 'next/head';
import Sidebar from '@/components/Sidebar';

const Notification = () => {
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
      <NotificationItem /> 
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} /> // Render each notification item using NotificationItem component
      ))}
    </div>
    </main>
    </>
  );
  
};

export default Notification;
