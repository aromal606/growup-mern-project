import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftSideBarComponent from "../../../Components/User/Leftsidebar/LeftSideBarComponent";
import NavigationBarComponent from "../../../Components/User/Navigationbar/NavigationBarComponent";
import PostSharingComponent from "../../../Components/User/PostSharing/PostSharingComponent";
import Card from "../../../Components/Card/Card";
import { useSelector } from "react-redux";
import RightSideBarComponent from "../../../Components/User/Rigthsidebar/RightSideBarComponent";
import axiosApi from "../../../API/axiosApi";
import io from 'socket.io-client'
const socket=io.connect('http://localhost:8800')

const HomePage = () => {
const sendMessage=()=>{

  socket.emit("from-home",{word:"hii"})
}

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("usertype");
  const userId = localStorage.getItem("id");
  const [posts, setPosts] = useState([]);
  const [sharedPosts, setSharedPosts] = useState([]);

  const [checkUser, setCheckUser] = useState(false);
  const { verifyUser, getPosts, sharePost } = axiosApi();
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

  useEffect(() => {
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
      const response = await sharePost(sharedPost)
      setSharedPosts((prevSharedPosts) => [...prevSharedPosts, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts()
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
        <div onClick={sendMessage} className="">
          <NavigationBarComponent />
        </div>
      </Card>
      <div className="grow flex max-w-8xl mx-auto gap-2 h-screen ">
     
        <div className="hidden sm:block grow mt-10">
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
