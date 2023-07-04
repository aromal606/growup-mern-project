import React, { useEffect, useState } from 'react';
import adminAxiosApi from '../../../API/adminAxiosApi';
import AdminBlockList from '../adminblocklist/AdminBlockList';
import AdminNav from '../navigation/AdminNav';
import { useSelector } from 'react-redux';
import NavigationAdmin from '../navigation/NavigationAdmin';

const AdminUsers = () => {
  const { getAllUser } = adminAxiosApi();
  const [value, setValue] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await getAllUser();
        setValue(data);
      } catch (error) {
        throw error;
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <AdminNav />
      <div className='flex'>
        <div className='w-2/12 bg-gray-700'>
          <NavigationAdmin />
        </div>
        <div className='w-8/12 bg-gray-600'>
          {value && <AdminBlockList user={value} />}
        </div>
        <div className='w-2/12 bg-gray-700'></div>
      </div>
    </>
  );
};

export default AdminUsers;
