import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Card from "../../Card/Card";
import OthersPosts from "../Posts/OthersPosts";
import Swal from "sweetalert2";
import axiosApi from "../../../API/axiosApi";

const { unFollowUser, followUser } = axiosApi();

function ProfileComponent({}) {
  const Id=localStorage.getItem("id")
  const { id } = useParams();
  const [modal, setModel] = useState();
  const [posts, setPosts] = useState([]);
  const [followings, setFollowings] = useState([]);
  const toggleModal = () => {
    setModel(!modal);
  };
  const [details, setDetails] = useState();

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:4000/getprofile/${id}`
      );
      setDetails(response.data);
    })();
  }, [followings]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/getUserPosts/${id}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

console.log(posts.length,"wertyuio");

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
      <Card>
        <div className="overflow-hidden w-full h-full">
          <img
            src="https://i.pinimg.com/474x/69/44/39/694439b3031503a7564eda9e24f673eb.jpg"
            alt="image"
            className="h-44 w-full overflow-hidden object-cover"
          />
          {details && details.length > 0
            ? details.map((data) => (
                <div className="block md:flex gap-9 mt-4" key={data._id}>
                  <div className="h-28 w-28 overflow-hidden border rounded-full ">
                    <img
                      src={data.imageName}
                      alt="your-image-description"
                      className="rounded-full w-full h-full object-cover border-4 md:relative z-5 md:left-0"
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex justify-between">
                      <p className="font-semibold md:text-2xl text-xl">
                        {data.name}
                      </p>
                      <div className="p-3 self-start">
                        {data.followers.includes(Id) ? (
                          <button
                            className="text-white bg-blue-500 px-4 py-2 rounded-lg"
                            onClick={() => handleUnfollow(data._id, Id)}
                          >
                            Following
                          </button>
                        ) : (
                          <button
                            className="text-white bg-blue-500 px-4 py-2 rounded-lg"
                            onClick={() => handleFollow(data._id, Id)}
                          >
                            Follow
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="bio">
                      <p className="">{data.bio}</p>
                    </div>
                    <div className="max-h-16 w-full">
                      <h1 className="text-xl font-bold">skills</h1>
                      <ul className="flex gap-7 text-lg">
                        {data.workingOn.map((workingOn, index) => (
                          <li key={index}>{workingOn}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex md:gap-32">
                      <div className="post">
                        <h1 className="font-semibold text-lg">Following</h1>
                        <h1 className="font-semibold text-slate-700 text-center text-sm">
                          {data.followings.length}
                        </h1>
                      </div>
                      <div className="followers">
                        <h1 className="font-semibold text-lg">Followers</h1>
                        <h1 className="font-semibold text-slate-700 text-center text-sm">
                          {data.followers.length}
                        </h1>
                      </div>
                      <div className="following ">
                        <h1 className="font-semibold text-lg">Post</h1>
                        <h1 className="font-semibold text-slate-700 text-center text-sm">
                         {posts.length}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </Card>
      {/* <OthersPosts id={id} /> */}
    </>
  );
}

export default memo(ProfileComponent);
