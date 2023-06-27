import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeftSideBarComponent from "../../../Components/User/Leftsidebar/LeftSideBarComponent";
import NavigationBarComponent from "../../../Components/User/Navigationbar/NavigationBarComponent";
import PostSharingComponent from "../../../Components/User/PostSharing/PostSharingComponent";
import Card from "../../../Components/Card/Card";
import { useSelector } from "react-redux";
import RightSideBarComponent from "../../../Components/User/Rigthsidebar/RightSideBarComponent";
import axiosApi from "../../../API/axiosApi";

const HomePage = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("usertype");
  const userId = localStorage.getItem("id");
  const [posts, setPosts] = useState([]);
  const [sharedPosts, setSharedPosts] = useState([]);

  const [checkUser, setCheckUser] = useState(false);
  const { verifyUser } = axiosApi();
  const verifyUserStatus = async () => {
    const response = await verifyUser(userId);
    if (response.status === "Active") {
      setCheckUser(true);
    } else {
      setCheckUser(false);
      navigate("/login");
      localStorage.removeItem("token");
    }
  };
  console.log(checkUser);

  useEffect(() => {
    console.log("verifyuser");
    verifyUserStatus();
  }, [checkUser]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (userType === "client" || userType === "freelancer") {
      navigate("/home");
    }
  }, [token, navigate, userType]);

  const handlePostShare = async (sharedPost) => {
    console.log(sharedPost, "sharedPost");
    try {
      const response = await axios.post(
        "http://localhost:4000/userPostShare",
        sharedPost
      );
      setSharedPosts((prevSharedPosts) => [...prevSharedPosts, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getPosts");
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Card>
        <div className="">
          <NavigationBarComponent />
        </div>
      </Card>
      <div className="grow flex max-w-8xl mx-auto gap-2 h-screen ">
        <div></div>
        <div className="hidden sm:block grow ">
          <LeftSideBarComponent />
        </div>
        <div className="grow relative">
          <PostSharingComponent onPostShare={handlePostShare} />
        </div>
        <div className=" flex">
          <div className="w-1/3 sm:block ">
            <RightSideBarComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
