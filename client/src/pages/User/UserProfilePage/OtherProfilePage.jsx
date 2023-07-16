import React from "react";
import LeftSideBarComponent from "../../../Components/User/Leftsidebar/LeftSideBarComponent";
import Card from "../../../Components/Card/Card";
import NavigationBarComponent from "../../../Components/User/Navigationbar/NavigationBarComponent";
import ProfileComponent from "../../../Components/User/UserProfile/ProfileComponent";
import OthersPosts from "../../../Components/User/Posts/OthersPosts";
import { useParams } from "react-router-dom";

const OtherProfilePage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="border">
  <NavigationBarComponent />
  <Card></Card>

  <div className="md:flex">
    <div className="md:w-1/4 hidden md:block mt-9">
      <LeftSideBarComponent />
    </div>
    <div className="w-full">
      <div className="overflow-hidden mt-7">
        <ProfileComponent />
      </div>
      <div className="bg-red-200">
        <OthersPosts id={id} />
      </div>
    </div>
  </div>
</div>

  );
};

export default OtherProfilePage;
