import React, { useEffect, useState } from "react";
import axiosApi from "../../../API/axiosApi";
import Card from "../../Card/Card";

const ConversationComponent = (props) => {
  const { userDatas } = axiosApi();
  const { data, currentUserId, online } = props;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((_id) => _id !== currentUserId);

    const getUserData = async () => {
      try {
        const { data } = await userDatas(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);
  return (
    <>
      <Card>
        <div className="followers conversation hover:bg-gray-200">
          <div className="p-1 flex gap-3 items-center ">
            <div className=" overflow-hidden rounded-full w-12 h-12 bg-red-300">
              {online &&
              
              <div className="bg-green-500 absolute rounded-full w-3 h-3">
                {" "}
              </div>
              }
              <img className="object-cover" src={userData?.profilePic} alt="" />
            </div>
            <div>
              <div className="font-semibold">{userData?.name}</div>
              <div className="text-gray-400 text-sm">{online?"Online":"Offline"}</div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ConversationComponent;



