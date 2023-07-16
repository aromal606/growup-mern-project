import React, { useEffect, useRef, useState } from "react";
import axiosApi from "../../../API/axiosApi";
import messageApi from "../../../API/messageApi";
import TimeAgo from "timeago-react";
import Card from "../../Card/Card";
import InputEmoji from "react-input-emoji";

const ChatBoxComponent = (props) => {
  const { getMessages, addMessages } = messageApi();
  const { userDatas } = axiosApi();

  const { chat, currentUserId, setSendMessage, receiveMessage } = props;
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const scroll = useRef();

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage?.chatId === chat?._id) {
     
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  useEffect(() => {
    const userId = chat?.members?.find((_id) => _id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await userDatas(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUserId]);

  // fetching message data

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessages) => {
    setNewMessages(newMessages);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUserId,
      text: newMessages,
      chatId: chat._id,
    };
    // send message to database
    try {
      const { data } = await addMessages(message);
      setMessages([...messages, data]);
      setNewMessages("");
    } catch (error) {
      console.log(error);
    } 
    // send msg to socket
    const receiverId = chat.members.find((id) => id !== currentUserId);
    setSendMessage({ ...message, receiverId });
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div>
        <div className="chatbox container flex flex-col gap-1 h-auto">
          <div className="chat-header ">
            <Card>
              <div className="follower -mt-2">
                <div className="followers conversation hover:bg-gray-200">
                  <div className="p-1 flex gap-3 items-center ">
                    <div className=" overflow-hidden rounded-full w-12 h-12">
                      <img
                        className="object-cover"
                        src={userData?.profilePic}
                        alt=""
                      /> 
                    </div>
                    <div>
                      <div className="font-semibold">{userData?.name}</div>
                      <div className="text-gray-400 text-sm">
                        {userData?.name ? "online" : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div
          className={
            chat === null
              ? "chat body messages mt-2  p-1 flex flex-col h-[23.7rem] items-center justify-center font-semibold"
              : "flex flex-col h-[23.7rem] overflow-y-scroll no-scrollbar"
          }
        >
          {chat === null ? (
            <span className="text-center">
              Tap on a Connections to Start Conversation
            </span>
          ) : (
            messages &&
            messages.map((message) => {
              if (message.senderId === currentUserId) {
                return (
                  <div
                    ref={scroll}
                    key={message?._id}
                    className="my-messages shadow-2xl w-4/12 mt-2 border rounded-tr-lg rounded-tl-lg rounded-br-lg bg-gradient-to-r from-blue-500 to-blue-800 self-end"
                  >
                    {/* my messages */}
                    <div className="p-2 flex flex-col h-auto">
                      <span className="text-lg font-semibold text-white">
                        {message?.text}
                      </span>
                      <span className="text-sm text-gray-100 text-right">
                        <span className="text-xs self-end">
                          <TimeAgo datetime={message?.createdAt} />
                        </span>
                      </span>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    ref={scroll}
                    key={message?._id}
                    className="his-messages  ml-1 mb-2 shadow-2xl text-black p-2 rounded-tr-lg rounded-br-lg max-w-xs w-fit-content bg-gradient-to-r from-violet-500  to-violet-800"
                  >
                    {/* his messages */}
                    <div className="p-1 flex flex-col">
                      <span className="text-lg font-semibold text-white">
                        {message?.text}
                      </span>
                      <span className="text-sm text-gray-400 text-right">
                        <span className="text-xs self-end">
                          <TimeAgo datetime={message?.createdAt} />
                        </span>
                      </span>
                    </div>
                  </div>
                );
              }
            })
          )}
        </div>

        <div className="chat_sender">
          <div>+</div>
          <div className="flex items-center">
            <InputEmoji value={newMessages} onChange={handleChange} />
            <div
              onClick={handleSend}
              className="bg-blue-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-gradient-to-r from-blue-400 to-blue-600"
            >
              Send
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBoxComponent;
