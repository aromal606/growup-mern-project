import React, { useState, useEffect } from "react";
import Timeago from "react-timeago";
import NameComponent from "../UserName/NameComponent";
import commentApi from "../../../API/commentApi";

const ReplyComponent = ({ commentId }) => {

  const {getReplay,sendReplay} = commentApi()
  const [reply, setReply] = useState("");
  const [replied, setReplied] = useState([]);
  const [show, setShow] = useState(false); // Add show state

  const replyObj = {
    commentId: commentId,
    userId: localStorage.getItem("id"),
    comment: reply,
  };

  const handleReply = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await sendReplay(replyObj)
      setReply("");
      fetchReplyComments(); // Fetch updated reply comments after sending reply
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReplyComments = async () => {
    try {
      const {data} = await getReplay(commentId)
      setReplied(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReplyComments();
  }, []);

  return (
    <>
      <div className="flex justify-end" onClick={() => setShow(!show)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 dark:stroke-gray-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </div>
      {show && ( // Use show state to conditionally render the replied comments section
        <div>
          <div>
            {replied?.map((obj) => (
              <div key={obj._id} className="ml-9 flex justify-between">
                <div className="flex gap-2">
                  <div>
                    <div className="dark:text-gray-200">
                      <NameComponent posterId={obj.userId} />
                    </div>
                    <p className="mb-3 font-light dark:text-gray-200">
                      {obj.comment}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between dark:text-gray-200">
                  <Timeago date={obj.createdAt} />
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleReply}>
            <div className="m-1 ml-6">
              <input
                className="border rounded-full p-2 mr-1 dark:bg-gray-700 dark:border-gray-800"
                name="reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Reply"
              />
              <button className="dark:text-gray-200" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ReplyComponent;
