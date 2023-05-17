import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeftSideBarComponent from "../../../Components/User/Leftsidebar/LeftSideBarComponent";
import NavigationBarComponent from "../../../Components/User/Navigationbar/NavigationBarComponent";
import PostSharingComponent from "../../../Components/User/PostSharing/PostSharingComponent";
import PostCardHeaderSection from "../../../Components/User/PostCard/PostCardHeaderSection";
import Card from "../../../Components/Card/Card";
import {useSelector} from 'react-redux'
const homePage = () => {
  const user = useSelector((state)=>state.auth)
  console.log(user,"user");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("usertype");

  const [posts, setPosts] = useState("");
  useEffect(() => {
    const postGetting = async () => {
      const postedData = await axios.get("http://localhost:4000/getPosts");
      setPosts(postedData);
    };
    postGetting();
  }, []);

  useEffect(() => {
    if (token) {
      if (userType == "client") {
        navigate("/home");
      }
      if (userType == "freelancer") {
        navigate("/home");
      }
    }else{
      navigate("/login");

    }
  }, [token]);

  return (
    <>
    <Card>
<div >

    <NavigationBarComponent/>
</div>
    </Card>
        <div className="grow flex max-w-8xl mx-auto gap-2 border h-screen ">
          <div>
            
          </div>
          <div className="hidden sm:block grow  ">
            <LeftSideBarComponent />
          </div>
          <div className="grow  overflow-x-auto ">
            <PostSharingComponent />
            {posts && <PostCardHeaderSection posts={posts} />}
          </div>
        </div>
   
    </>
  );
};

export default homePage;
