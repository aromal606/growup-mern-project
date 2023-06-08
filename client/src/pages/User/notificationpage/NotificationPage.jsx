import React, { useEffect, useState } from 'react';
import NotificationCard from '../../../Components/User/notifications/NotificationCard';
import axiosApi from '../../../API/axiosApi';
import NavigationBarComponent from '../../../Components/User/Navigationbar/NavigationBarComponent';
import LeftSideBarComponent from '../../../Components/User/Leftsidebar/LeftSideBarComponent';
import Card from '../../../Components/Card/Card';

const { getNotification } = axiosApi();

const id = localStorage.getItem("id");

const NotificationPage = () => {
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotification(id);
        console.log(response.data,"1111");
        setNotificationData(response.data);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
// console.log(notificationData,"wwwwww");
  return (
    <>
    <div className="grow h-screen flex">
      <div className="">

      <Card>
        <NavigationBarComponent />
      </Card>
      </div>

      <div className="mt-2 mr-1">
        <LeftSideBarComponent />
      </div>
      <div className="mt-20 w-full">
      <NotificationCard notificationData={notificationData} />
      </div>
    </div>
  </>
  );
};

export default NotificationPage;
