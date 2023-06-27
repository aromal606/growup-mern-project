import React, { useState, useEffect } from "react";
import NameComponent from "../../User/UserName/NameComponent";
import adminAxiosApi from "../../../API/adminAxiosApi";
import Swal from "sweetalert2";

const AdminBlockedPosts = ({ posts }) => {
  const { blockAPost } = adminAxiosApi();
  const [updatedPosts, setUpdatedPosts] = useState(posts);
  const [status, setStatus] = useState("");

  const blockingPost = async (id) => {
    try {
      const { data } = await blockAPost(id);
      if (data) {
        setStatus(data.status)
        const updatedStatus =
          data.status === "active"
            ? "Block"
            : data.status === "Block"
            ? "Unblock"
            : "Block";

        const updatedPostList = updatedPosts.map((post) =>
          post._doc.postId === id ? { ...post, status: updatedStatus } : post
        );
        setUpdatedPosts(updatedPostList);

        Swal.fire("success", `Post is ${data.status}!`, "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // setUpdatedPosts(posts);
    blockingPost()
  }, []);

  return (
    <>
      <div className="">
        {posts.map((obj) => (
          <div
            key={obj._doc.postId}
            className="p-3 mt-1 bg-white rounded flex justify-between border"
          >
            <div className="flex items-center gap-7">
              <img className="h-20 w-36 mb-3 shadow-lg" src={obj.imageName} />
              <p>
                <NameComponent posterId={obj._doc.userId} />
              </p>
              <p className="font-bold">{obj._doc.reason}</p>
            </div>
            <div className="flex items-center justify-between w-60">
              <div className="flex justify-around">                <div>
                  <button
                    onClick={() => {
                      blockingPost(obj._doc.postId);
                    }}
                    className={`items-center px-4 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none ${
                      obj.status === "active"
                        ? "text-white bg-green-500 border border-green-500 hover:bg-green-600 focus:ring-green-600"
                        : obj.status === "Block"
                        ? "text-white bg-red-500 border border-red-500 hover:bg-red-600 focus:ring-red-600"
                        : obj.status === "Unblock"
                        ? "text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:ring-blue-600"
                        : ""
                    }`}
                  >
                    {obj.status === "active"
                      ? "Block"
                      : obj.status === "Block"
                      ? "Unblock"
                      : obj.status === "Unblock"
                      ? "Block"
                      : obj.status}
                  </button>
                </div>
                <div className=" items-center ml-10 flex">
                  <div>
                    <h2 className="font-semibold ">
                      {obj.status}
                     
                      {/* {obj.status === "active"
                        ? "Active"
                        : obj.status === "Block"
                        ? "Blocked"
                        : obj.status === "Unblock"
                        ? "Active"
                        : obj.status} */}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminBlockedPosts;



// useEffect(() => {
//   const blockingPost = async (id) => {
//     try {
//       const { data } = await blockAPost(id);
//       if (data) {
//         setStatus(data.status);
//         const updatedStatus =
//           data.status === 'active'
//             ? 'Block'
//             : data.status === 'Block'
//             ? 'Unblock'
//             : 'Block';

//         const updatedPostList = updatedPosts.map((post) =>
//           post._doc.postId === id ? { ...post, status: updatedStatus } : post
//         );
//         setUpdatedPosts(updatedPostList);

//         Swal.fire('success', `Post is ${data.status}!`, 'success');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Call the blockingPost function here
//   blockingPost(id);
// }, []); 