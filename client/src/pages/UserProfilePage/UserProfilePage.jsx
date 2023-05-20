import React, { useEffect, useState } from "react";
import UserProfileComponent from "../../Components/User/UserProfile/UserProfileComponent";
import LeftSideBarComponent from "../../Components/User/Leftsidebar/LeftSideBarComponent";
import Card from "../../Components/Card/Card";
import NavigationBarComponent from "../../Components/User/Navigationbar/NavigationBarComponent";
import axios from "axios";
const UserProfilePage = () => {
  const [posts, setPosts] = useState("");
  useEffect(() => {
    const postGetting = async () => {
      const postedData = await axios.get("http://localhost:4000/getPosts");
      setPosts(postedData);
    };
    postGetting();
  }, []);
  return (
    <div className="grow h-screen overflow-hidden">
      <Card>
        <NavigationBarComponent />
      </Card>

      <div className="h-screen  w-full flex ">
        <div className="md:-mt-5 hidden md:block">
          <LeftSideBarComponent />
        </div>
        <div className="grow overflow-x-scroll">
          <UserProfileComponent />
          <div className="h-screen bg-red-200">
            {/* <PostCardHeaderSection/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
