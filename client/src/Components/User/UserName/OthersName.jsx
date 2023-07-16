import React, { useState, useEffect } from "react";
import axiosApi from "../../../API/axiosApi";
const OthersName = (props) => {
  const {posterId} = props;   
  const {getNameAndData} = axiosApi()
    
  const [name, setName] = useState("");
  const [profilepic, setProfilePic] = useState("");
  

  useEffect(() => {
    const getUserName = async () => {
      const { data } = await getNameAndData(posterId)
      setName(data?.name);
      setProfilePic(data?.profilePic);
    };
    getUserName();
  }, []);
 
  return (
    <div className="flex items-center gap-2">
      <div>
        <div className=" grow rounded-full overflow-hidden border">
  
          <img
            className="overflow-hidden object-cover w-14 h-14"
            src={profilepic}
            alt="profile pic"
          />
        </div>
      </div>
      <div className="font-semibold">{name}</div>
    </div>
  )
}

export default OthersName








