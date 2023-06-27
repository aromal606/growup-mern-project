import React, { useState, useEffect } from "react";
import adminAxiosApi from "../../../API/adminAxiosApi";
import AdminBlockedPosts from "../adminblockedposts/AdminBlockedPosts";
import AdminNav from "../navigation/AdminNav";
import NavigationAdmin from "../navigation/NavigationAdmin";

const AdminReports = () => {
  const { getReportedPosts } = adminAxiosApi();
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await getReportedPosts();
      setPosts(data);
    };
    getPosts();
  }, [posts]);

  return (
    <>
      <AdminNav />
      <div className="flex bg-gray-700">
        <div className="">
          <NavigationAdmin />
        </div>
        <div className="border w-full">
        
         {posts && <AdminBlockedPosts posts={posts}/>}
        </div>
      </div>
     
    </>
  );
};

export default AdminReports;
