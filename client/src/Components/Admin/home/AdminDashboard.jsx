import React, { useEffect, useState, useRef } from "react";
import adminAxiosApi from "../../../API/adminAxiosApi";
import BarChartComponent from "../barchart/BarChartComponent";
import NavChartCard from "../navigation/NavChartCard";
import AdminNav from "../navigation/AdminNav";
import DataTableComponent from "../datatable/DataTableComponent";
// import { io } from 'socket.io-client'
import PdfComponent from "../pdf/PdfComponent";
import NavigationAdmin from "../navigation/NavigationAdmin";

const AdminDashboard = () => {
  const { countAllPosts, countAllUsers, dailyPost, monthlyPost, yearlyPost } =
    adminAxiosApi();
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [newPostToday, setNewPostToday] = useState();
  const [yearlyData, setYearlyData] = useState([]);
  const [postCount, setPostCount] = useState();
  const [userCount, setUserCount] = useState();
  const [onlineUsers, setOnlineUsers] = useState();

  const totalPosts = async () => {
    const { data } = await countAllPosts();
    setPostCount(data.count);
  };

  const totalUsers = async () => {
    const { data } = await countAllUsers();
    setUserCount(data.count);
  };

  const getDailyPosts = async () => {
    const { data } = await dailyPost();
    setDailyData(data);
    const today = data.length;
    const todayCount = data[today - 1].count;
    setNewPostToday(todayCount);
  };
  const getYearlyPosts = async () => {
    const { data } = await yearlyPost();
    setYearlyData(data);
  };

  const getMonthlyPosts = async () => {
    const { data } = await monthlyPost();
    setMonthlyData(data);
  };

  useEffect(() => {
    getDailyPosts();
    totalPosts();
    totalUsers();
    getMonthlyPosts();
    getYearlyPosts();
  }, []);

  return (
    <>
      <AdminNav />
      <div className="flex">
        <div className="w-2/12 bg-gray-700">
          <NavigationAdmin />
        </div>
        <div className="w-10/12">
          <div className="grid grid-cols-4 gap-x-5 grid-flow-row-dense bg-gray-800 p-5">
            <div className="bg-gray-700 rounded-lg shadow-xl min-h-[50px]">
              <NavChartCard count={postCount} action={"Posts"} />
            </div>
            <div className="bg-gray-700 rounded-lg shadow-xl min-h-[50px]">
              <NavChartCard count={userCount} action={"Users"} />
            </div>
            <div className="bg-gray-700 rounded-lg shadow-xl min-h-[50px]">
              <NavChartCard count={newPostToday} action={"Posted Today"} />
            </div>
            <div className="bg-gray-700 rounded-lg shadow-xl min-h-[50px]">
              <NavChartCard count={onlineUsers} action={"Active"} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-5 grid-flow-row-dense bg-slate-800 p-5">
            <div className="bg-gray-700  rounded-lg shadow-xl min-h-[50px]">
              <h1 className="m-5 font-bold text-white text-2xl text-center">
                Daily Post 
              </h1>
              <div>
                {dailyData && (
                  <BarChartComponent data={dailyData} color={"#82ca9d"} />
                )}
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg shadow-xl min-h-[50px]">
              <h1 className="m-5 font-bold text-white text-2xl text-center">
                Monthly Post 
              </h1>
              <div>
                {monthlyData && (
                  <BarChartComponent data={monthlyData} color={"#8884d8"} />
                )}
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg shadow-xl min-h-[50px]">
              <h1 className="m-5 font-bold text-white text-2xl text-center">
                Yearly Post 
              </h1>
              <div>
                {yearlyData && (
                  <BarChartComponent data={yearlyData} color={"#ffc658"} />
                )}
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg shadow-xl min-h-[50px]">
              <div className="m-4">
                {dailyData && (
                  <PdfComponent data={dailyData} action={"Daily Post Report"} />
                )}
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg shadow-xl min-h-[50px]">
              <div className="m-4">
                {monthlyData && (
                  <PdfComponent
                    data={monthlyData}
                    action={"Monthly Post Report"}
                  />
                )}
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg shadow-xl min-h-[50px]">
              <div className="m-4">
                {yearlyData && (
                  <PdfComponent
                    data={yearlyData}
                    action={"Yearly Post Report"}
                  />
                )}
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg shadow-xl min-h-[50px]">
              <DataTableComponent data={dailyData} />
            </div>
            <div className="bg-gray-700 rounded-lg shadow-xl min-h-[50px]">
              <DataTableComponent data={monthlyData} />
            </div>
            <div className="bg-gray-700 rounded-lg shadow-xl min-h-[50px]">
              <DataTableComponent data={yearlyData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
