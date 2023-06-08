import React from "react";
import UsersListComponent from "../../../Components/User/UsersList/UsersListComponent";
import NavigationBarComponent from "../../../Components/User/Navigationbar/NavigationBarComponent";
import LeftSideBarComponent from "../../../Components/User/Leftsidebar/LeftSideBarComponent";
import Card from "../../../Components/Card/Card";
const UsersListPage = () => {
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
        <div className="border mt-16 w-full">
          <UsersListComponent />
        </div>
      </div>
    </>
  );
};

export default UsersListPage;
