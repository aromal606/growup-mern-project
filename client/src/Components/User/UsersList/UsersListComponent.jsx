import React, { useEffect, useState } from "react";
import axiosApi from "../../../API/axiosApi";
import Card from "../../Card/Card";
import Swal from "sweetalert2";
import {Link} from 'react-router-dom'
const { getFollowers, unFollowUser, followUser, getAllUsers } = axiosApi();
const { getFollowings } = axiosApi();

const UsersListComponent = (props) => {
  const id = localStorage.getItem("id");
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [showFollowers, setShowFollowers] = useState(true);
  const [showFollowing, setShowFollowing] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getFollower = async () => {
      try {
        const response = await getFollowers(id);
        setFollowers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFollower();
  }, [id,followers]);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await getFollowings(id);
        setFollowings(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowing();
  }, [id,followings]);


  useEffect(() => {
    const getAllUsersData = async () => {
      try {
        const response = await getAllUsers(id);
        setAllUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsersData();
  }, [id,followers,followings]);

  const handleFollowers = () => {
    setShowFollowers(true);
    setShowFollowing(false);
  };

  const handleFollowing = () => {
    setShowFollowers(false);
    setShowFollowing(true);
  };

  const handleAllUsers = () => {
    setShowFollowers(false);
    setShowFollowing(false);
  };

  const handleUnfollow = async (id, myId) => {
    try {
      const confirmDialog = await Swal.fire({
        icon: "question",
        title: "Confirm Unfollow",
        text: "Are you sure you want to unfollow?",
        showCancelButton: true,
        confirmButtonText: "Yes, unfollow",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        customClass: {
          popup: "swal2-sm",
        },
      });

      if (confirmDialog.isConfirmed) {
        await unFollowUser(id, myId);
        setFollowings((prevFollowings) =>
          prevFollowings.filter((user) => user._id !== id)
        );
        Swal.fire({
          icon: "success",
          title: "Unfollowed",
          text: "You have successfully unfollowed",
          customClass: {
            popup: "swal2-sm",
            content: "swal sm:w-sm md:w-sm lg:w-sm", // Apply the custom width class based on the desired size
          },
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to unfollow.",
        customClass: {
          popup: "swal2-sm",
        },
      });
    }
  };

  const handleFollow = async (id, myId) => {
    try {
      await followUser(id, myId);
      setFollowings((prevFollowings) =>
        prevFollowings.map((user) => {
          if (user._id === id) {
            return { ...user, followers: [...user.followers, myId] };
          }
          return user;
        })
      );
      Swal.fire({
        icon: "success",
        title: "Followed",
        text: "You are now following",
        customClass: {
          popup: "swal2-",
          content: "w-[10rem]",
        },
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to follow",
        customClass: {
          popup: "swal2-sm",
        },
      });
    }
  };

  return (
    <>
    <div className="flex-col">
      <div className="text-2xl mb-3 p-3">your connections</div>
      <Card>
        <div className="flex gap-3 p-3 font font-semibold">
          <button onClick={handleFollowers} className="hover:bg-gray-200">
            followers
          </button>
          <div>
            <button onClick={handleFollowing} className="hover:bg-gray-200">
              following
            </button>
          </div>
          <div>
            <button onClick={handleAllUsers} className="hover:bg-gray-200 ">
              find more..
            </button>
          </div>
        </div>
      </Card>
      <div className="">
        {showFollowers && followers.length === 0 && (
          <p className="text-center p-2 font-semibold">
            You have no followers yet.
          </p>
        )}
        {showFollowers &&
          followers.map((obj) => (
            <Card key={obj._id}>
              {/* {console.log(obj)} */}
              <div className="flex gap-4 justify-between ">
                <div className="flex items-center gap-3">
                  <div className="border rounded-full">
                    <img
                      className="w-16 h-16 rounded-full"
                      src={obj.imageName}
                      alt=""
                    />
                  </div>
                  <Link to={`/otherProfile/${obj._id}`}>
                    <div>
                      <p className="font-semibold">{obj.name}</p>
                      <p>working on:&nbsp; {obj.workingOn.join(",")}</p>
                      <p>5 posts shared</p>
                    </div>
                  </Link>
                </div>
                <div className="p-3 self-start">
                  {obj.followers.includes(id) ? (
                    <button
                      className="text-white bg-blue-500 px-4 py-2 rounded-lg"
                      onClick={() => {
                        handleUnfollow(obj._id, id);
                      }}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      className="text-white bg-blue-500 px-4 py-2 rounded-lg"
                      onClick={() => {
                        handleFollow(obj._id, id);
                      }}
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        {showFollowing && followings.length === 0 && (
          <p className="text-center p-2 font-semibold">
            You are not following anyone.
          </p>
        )}
        {showFollowing &&
          followings.map((obj) => (
            <Card key={obj._id}>
              {/* {console.log(obj)} */}

              <div className="flex gap-4 justify-between ">
                <div className="flex items-center gap-3">
                  <div className="border rounded-full">
                    <img
                      className="w-16 h-16 rounded-full"
                      src={obj.imageName}
                      alt=""
                    />
                  </div>
                  <Link to={`/otherProfile/${obj._id}`}>
                    <div>
                      <p className="font-semibold">{obj.name}</p>
                      <p>working on:&nbsp; {obj.workingOn.join(",")}</p>
                      <p>5 posts shared</p>
                    </div>
                  </Link>
                </div>
                <div className="p-3 self-start">
                  {obj.followers.includes(id) ? (
                    <button
                      className="text-white bg-blue-500 px-4 py-2 rounded-lg"
                      onClick={() => handleUnfollow(obj._id, id)}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      className="text-white bg-blue-500 px-4 py-2 rounded-lg"
                      onClick={() => handleFollow(obj._id, id)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        {!showFollowers && !showFollowing && (
          <>
            {allUsers.length === 0 ? (
              <p className="text-center p-2 font-semibold">
                No users found.
              </p>
            ) : (
              allUsers.map((user) => (
                <Card key={user._id}>
                  <div className="flex gap-4 justify-between ">
                    <div className="flex items-center gap-3">
                      <div className="border rounded-full">
                        <img
                          className="w-16 h-16 rounded-full"
                          src={user.imageName}
                          alt=""
                        />
                      </div>
                      <Link to={`/otherProfile/${user._id}`}>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p>working on:&nbsp; {user.workingOn.join(",")}</p>
                          <p>5 posts shared</p>
                        </div>
                      </Link>
                    </div>
                    <div className="p-3 self-start">
                      {user.followers.includes(id) ? (
                        <button
                          className="text-white bg-blue-500 px-4 py-2 rounded-lg"
                          onClick={() => handleUnfollow(user._id, id)}
                        >
                          Following
                        </button>
                      ) : (
                        <button
                          className="text-white bg-blue-500 px-4 py-2 rounded-lg"
                          onClick={() => handleFollow(user._id, id)}
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </>
        )}
      </div>
    </div>
  </>
  );
};

export default UsersListComponent;





// import React, { useEffect, useState } from "react";
// import axiosApi from "../../../API/axiosApi";
// import Card from "../../Card/Card";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";

// const { getFollowers, unFollowUser, followUser, getAllUsers } = axiosApi();
// const { getFollowings } = axiosApi();

// const UsersListComponent = (props) => {
//   const id = localStorage.getItem("id");
//   const [followers, setFollowers] = useState([]);
//   const [followings, setFollowings] = useState([]);
//   const [showFollowers, setShowFollowers] = useState(true);
//   const [showFollowing, setShowFollowing] = useState(false);
//   const [allUsers, setAllUsers] = useState([]);

//   useEffect(() => {
//     const getFollower = async () => {
//       try {
//         const response = await getFollowers(id);
//         setFollowers(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getFollower();
//   }, [id]);

//   useEffect(() => {
//     const getFollowing = async () => {
//       try {
//         const response = await getFollowings(id);
//         setFollowings(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getFollowing();
//   }, [id]);

//   useEffect(() => {
//     const getAllUsersData = async () => {
//       try {
//         const response = await getAllUsers();
//         setAllUsers(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getAllUsersData();
//   }, []);

//   const handleFollowers = () => {
//     setShowFollowers(true);
//     setShowFollowing(false);
//   };

//   const handleFollowing = () => {
//     setShowFollowers(false);
//     setShowFollowing(true);
//   };

//   const handleAllUsers = () => {
//     setShowFollowers(false);
//     setShowFollowing(false);
//   };

//   const handleUnfollow = async (id, myId) => {
//     try {
//       const confirmDialog = await Swal.fire({
//         icon: "question",
//         title: "Confirm Unfollow",
//         text: "Are you sure you want to unfollow?",
//         showCancelButton: true,
//         confirmButtonText: "Yes, unfollow",
//         cancelButtonText: "Cancel",
//         reverseButtons: true,
//         customClass: {
//           popup: "swal2-sm",
//         },
//       });

//       if (confirmDialog.isConfirmed) {
//         await unFollowUser(id, myId);
//         setFollowings((prevFollowings) =>
//           prevFollowings.filter((user) => user._id !== id)
//         );
//         Swal.fire({
//           icon: "success",
//           title: "Unfollowed",
//           text: "You have successfully unfollowed",
//           customClass: {
//             popup: "swal2-sm",
//             content: "swal sm:w-sm md:w-sm lg:w-sm", // Apply the custom width class based on the desired size
//           },
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to unfollow.",
//         customClass: {
//           popup: "swal2-sm",
//         },
//       });
//     }
//   };

//   const handleFollow = async (id, myId) => {
//     try {
//       await followUser(id, myId);
//       setFollowings((prevFollowings) =>
//         prevFollowings.map((user) => {
//           if (user._id === id) {
//             return { ...user, followers: [...user.followers, myId] };
//           }
//           return user;
//         })
//       );
//       Swal.fire({
//         icon: "success",
//         title: "Followed",
//         text: "You are now following",
//         customClass: {
//           popup: "swal2-",
//           content: "w-[10rem]",
//         },
//       });
//     } catch (error) {
//       console.log(error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to follow",
//         customClass: {
//           popup: "swal2-sm",
//         },
//       });
//     }
//   };

//   return (
//     <>
//       <div className="flex-col">
//         <div className="text-2xl mb-3 p-3">your connections</div>
//         <Card>
//           <div className="flex gap-3 p-3 font font-semibold">
//             <button onClick={handleFollowers} className="hover:bg-gray-200">
//               followers
//             </button>
//             <div>
//               <button onClick={handleFollowing} className="hover:bg-gray-200">
//                 following
//               </button>
//             </div>
//             <div>
//               <button onClick={handleAllUsers} className="hover:bg-gray-200 ">
//                 find more..
//               </button>
//             </div>
//           </div>
//         </Card>
//         <div className="">
//           {showFollowers && followers.length === 0 && (
//             <p className="text-center p-2 font-semibold">
//               You have no followers yet.
//             </p>
//           )}
//           {showFollowers &&
//             followers.map((obj) => (
//               <Card key={obj._id}>
//                 {/* {console.log(obj)} */}
//                 <div className="flex gap-4 justify-between ">
//                   <div className="flex items-center gap-3">
//                     <div className="border rounded-full">
//                       <img
//                         className="w-16 h-16 rounded-full"
//                         src={obj.imageName}
//                         alt=""
//                       />
//                     </div>
//                     <Link to={`/otherProfile/${obj._id}`}>
//                       <div>
//                         <p className="font-semibold">{obj.name}</p>
//                         <p>working on:&nbsp; {obj.workingOn.join(",")}</p>
//                         <p>5 posts shared</p>
//                       </div>
//                     </Link>
//                   </div>
//                   <div className="p-3 self-start">
//                     {obj.followers.includes(id) ? (
//                       <button
//                         className="text-white bg-blue-500 px-4 py-2 rounded-lg"
//                         onClick={() => {
//                           handleUnfollow(obj._id, id);
//                         }}
//                       >
//                         Following
//                       </button>
//                     ) : (
//                       <button
//                         className="text-white bg-blue-500 px-4 py-2 rounded-lg"
//                         onClick={() => {
//                           handleFollow(obj._id, id);
//                         }}
//                       >
//                         Follow
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           {showFollowing && followings.length === 0 && (
//             <p className="text-center p-2 font-semibold">
//               You are not following anyone.
//             </p>
//           )}
//           {showFollowing &&
//             followings.map((obj) => (
//               <Card key={obj._id}>
//                 {/* {console.log(obj)} */}

//                 <div className="flex gap-4 justify-between ">
//                   <div className="flex items-center gap-3">
//                     <div className="border rounded-full">
//                       <img
//                         className="w-16 h-16 rounded-full"
//                         src={obj.imageName}
//                         alt=""
//                       />
//                     </div>
//                     <Link to={`/otherProfile/${obj._id}`}>
//                       <div>
//                         <p className="font-semibold">{obj.name}</p>
//                         <p>working on:&nbsp; {obj.workingOn.join(",")}</p>
//                         <p>5 posts shared</p>
//                       </div>
//                     </Link>
//                   </div>
//                   <div className="p-3 self-start">
//                     {obj.followers.includes(id) ? (
//                       <button
//                         className="text-white bg-blue-500 px-4 py-2 rounded-lg"
//                         onClick={() => handleUnfollow(obj._id, id)}
//                       >
//                         Following
//                       </button>
//                     ) : (
//                       <button
//                         className="text-white bg-blue-500 px-4 py-2 rounded-lg"
//                         onClick={() => handleFollow(obj._id, id)}
//                       >
//                         Follow
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           {!showFollowers && !showFollowing && (
//             <>
//               {allUsers.length === 0 ? (
//                 <p className="text-center p-2 font-semibold">
//                   No users found.
//                 </p>
//               ) : (
//                 allUsers.map((user) => (
//                   <Card key={user._id}>
//                     <div className="flex gap-4 justify-between ">
//                       <div className="flex items-center gap-3">
//                         <div className="border rounded-full">
//                           <img
//                             className="w-16 h-16 rounded-full"
//                             src={user.imageName}
//                             alt=""
//                           />
//                         </div>
//                         <Link to={`/otherProfile/${user._id}`}>
//                           <div>
//                             <p className="font-semibold">{user.name}</p>
//                             <p>working on:&nbsp; {user.workingOn.join(",")}</p>
//                             <p>5 posts shared</p>
//                           </div>
//                         </Link>
//                       </div>
//                       <div className="p-3 self-start">
//                         {user.followers.includes(id) ? (
//                           <button
//                             className="text-white bg-blue-500 px-4 py-2 rounded-lg"
//                             onClick={() => handleUnfollow(user._id, id)}
//                           >
//                             Following
//                           </button>
//                         ) : (
//                           <button
//                             className="text-white bg-blue-500 px-4 py-2 rounded-lg"
//                             onClick={() => handleFollow(user._id, id)}
//                           >
//                             Follow
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </Card>
//                 ))
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UsersListComponent;
