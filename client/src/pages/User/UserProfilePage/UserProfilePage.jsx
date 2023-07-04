import React from "react";
import UserProfileComponent from "../../../Components/User/UserProfile/UserProfileComponent";
import LeftSideBarComponent from "../../../Components/User/Leftsidebar/LeftSideBarComponent";
import UserPosts from "../../../Components/User/Posts/UserPosts";
import NavigationBarComponent from "../../../Components/User/Navigationbar/NavigationBarComponent";
const UserProfilePage = () => {

  return (
    <div className="grow h-screen ">
      
        <NavigationBarComponent />
      

      <div className="h-screen  w-full flex ">
        <div className="mt-16 hidden md:block">
          <LeftSideBarComponent />
        </div>
        <div className="grow overflow-x-scroll scrollbar-hide">
          <div className="overflow-hidden mt-14">
          <UserProfileComponent />

          </div>
          <div className="h-screen">
            <UserPosts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
