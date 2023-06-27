import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../Card/Card";
import NameComponent from "../UserName/NameComponent";
import CommentCountComponent from "../PostCard/CommentCountComponent";
import ReactTimeago from "react-timeago";
import ReplyComponent from "../PostCard/ReplyComponent";
import { Link } from "react-router-dom";
const UserPosts = () => {
  const id = localStorage.getItem("id");
  const [posts, setPosts] = useState([]);
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const [postId, setPostId] = useState();
  const [postIdSetter, setPostIdSetter] = useState();

  const [commentValue, setCommentValue] = useState("");
  const [showComment, setShowComment] = useState();
  const [triggerEffect, setTriggerEffect] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const reTriggerEffect = () => {
    setTriggerEffect((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/getUserPosts/${id}`
        );
        console.log(response.data, "rrr");

        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/comment/getComment",
          { postId: postIdSetter }
        );
        setShowComment(response.data);
        if (postIdSetter === postId && typeof onCommentAdded === "function") {
          onCommentAdded();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchComment();
  }, [postIdSetter, triggerEffect]);

  const handleLike = async (postId) => {
    try {
      await axios.post("http://localhost:4000/likepost", {
        postId,
        userId: localStorage.getItem("id"),
      });

      // Refresh the posts after liking
      const response = await axios.get(`http://localhost:4000/getUserPosts/${id}`);
      setPosts(response.data);
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  const commentData = {
    postId: postId,
    commenterId: localStorage.getItem("id"),
    comment: commentValue,
  };

  const addComment = async () => {
    try {
      axios.post("http://localhost:4000/comment/createComment", commentData);
    } catch (error) {
      console.log(error);
    }
    setCommentValue("");
  };

  return (
    <>
      {posts?.map((obj) => (
        <div className="flex  grow overflow-hidden">
          <Card>
            <div className="flex gap-2 ">
              <div className="flex grow items-center ">
                <div className="grow">
                <div className="flex items-center gap-2">
                    <Link to="/userProfile">
                      <a className="font-semibold">
                        <NameComponent posterId={obj?.userId} />
                      </a>
                    </Link>
                    <div className=" text-gray-500">
                      shared a post <ReactTimeago date={obj.createdAt} />
                    </div>
                  </div>
                </div>

                <div className="">
                  <button onClick={() => setDropdownOpen(!dropDownOpen)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </button>
                  <div className=" m-2">
                    {dropDownOpen && (
                      <Card>
                        <ul className="m-2">
                         
                          <li className="flex font-semibold gap-3 rounded-sm hover:bg-gray-300 hover:scale-110 dark:hover:bg-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                            delete
                          </li>
                          
                        </ul>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <p>{obj.content}</p>

            <img
              className="overflow-hidden w-full object-cover p-1 "
              src={obj.imageName}
              alt=""
            />

            <div className="flex mt-2 p-2 gap-3 items-center border">
              {obj?.likes?.length}
              <div>
                <button
                  className=""
                  onClick={() => handleLike(obj._id)}
                  // Pass postId
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <p className="dark:text-gray-200">
                  {/* <CommentCountComponent
                    postId={obj._id}
                    // onCommentAdded={onCommentAdded}
                  /> */}
                </p>
                <button
                  onClick={() => {
                    setShowModal(true),
                      setPostIdSetter(obj._id),
                      reTriggerEffect();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                    />
                  </svg>
                </button>
              </div>
              <div className="grow flex overflow-hidden gap-1">
                <textarea
                  id="caption"
                  type="text"
                  placeholder={"share your thoughts..."}
                  value={commentValue}
                  className="w-2/3 border p-1 h-9 rounded overflow-hidden"
                  onChange={(e) => setCommentValue(e.target.value)}
                  onClick={() => {
                    setPostId(obj._id);
                  }}
                />
                <button
                  className="bg-blue-500  text-white px-3 rounded hover:bg-blue-600"
                  onClick={() => {
                    addComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
            <div>
              {showModal ? (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="my-6 w-96 mx-auto max-w-3xl">
                    <div className="rounded-lg shadow-lg  flex flex-col w-full bg-white outline-none dark:border-gray-800 focus:outline-none dark:bg-gray-800">
                      <div className="p-6 flex-auto">
                        {showComment.map((obj) => (
                          <div className="mb-4">
                            <div className="flex justify-between">
                              <div className="flex gap-2">
                                {/* <ProfileImageComponent userId={obj.userId} /> */}
                                <div className="dark:text-gray-200">
                                  <NameComponent posterId={obj.commenterId} />
                                  <p>{obj.comment}</p>
                                </div>
                              </div>
                              <div className="dark:text-gray-200 text-gray-400">
                                <ReactTimeago date={obj.createdAt} />
                              </div>
                            </div>
                            <ReplyComponent commentId={obj._id} />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-end p-5 bg-gray-100 border-solid border-gray-300 rounded dark:bg-gray-800 dark:border-gray-900">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:text-red-600"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </Card>
        </div>
      ))}
    </>
  );
};

export default UserPosts;
