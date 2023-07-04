import React, { useState, useEffect } from "react";
import adminAxiosApi from "../../../API/adminAxiosApi";
import NameComponent from "../../User/UserName/NameComponent";

const AdminBlockList = ({ user }) => {
  const { blockAUser, getUserStatus } = adminAxiosApi();
  const [blockedUsers, setBlockedUsers] = useState([]);

  const blockUser = async (id) => {
    try {
      const { data } = await blockAUser(id);
      setBlockedUsers((prevBlockedUsers) =>
        prevBlockedUsers.map((user) => {
          if (user._id === id) {
            return {
              ...user,
              status: data.status
            };
          }
          return user;
        })
      );
    } catch (error) {
      return error
    }
  };

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const promises = user.map(async (obj) => {
          const { data } = await getUserStatus(obj._id);
          return {
            ...obj,
            status: data.status
          };
        });

        const updatedUsers = await Promise.all(promises);
        setBlockedUsers(updatedUsers);
      } catch (error) {
       throw error
      }
    };

    fetchUserStatus();
  }, [user,blockedUsers]);

  return (
    <>
      <div className="">
        {blockedUsers.map((obj) => (
          <div
            className="p-3 mt-1 bg-gray-500 rounded flex justify-between"
            key={obj._id}
          >
            <div className="flex items-center gap-7">
              <p className="font-bold text-white">
                <NameComponent posterId={obj._id} />
              </p>
            </div>
            <div className="flex items-center justify-between w-60">
              <div className="flex justify-around">
                <div>
                  <button
                    onClick={() => {
                      blockUser(obj._id);
                    }}
                    className={`items-center px-4 py-2 text-sm font-medium text-center rounded-lg focus:outline-none ${
                      obj.status === "Block"
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-black"
                    }`}
                  >
                    {obj.status === "Block" ? "Unblock" : "Deactive"}
                  </button>
                </div>
              </div>
              <div>
                status
              </div>
              <div>
                <p className="text-white font-semibold">

                {obj.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminBlockList;
