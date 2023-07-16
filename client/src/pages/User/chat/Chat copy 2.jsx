import React, { useEffect, useRef, useState } from "react";
import Card from "../../../Components/Card/Card";
import NavigationBarComponent from "../../../Components/User/Navigationbar/NavigationBarComponent";
import LeftSideBarComponent from "../../../Components/User/Leftsidebar/LeftSideBarComponent";
import chatApi from "../../../API/chatApi";
import ConversationComponent from "../../../Components/User/conversation/ConversationComponent";
import ChatBoxComponent from "../../../Components/User/chatbox/ChatBoxComponent";
import {io} from 'socket.io-client'

const Chat = () => {
  const socket = useRef();
  const divRef = useRef(null);
  const { getChat } = chatApi();
  const id = localStorage.getItem("id");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  // Handle socket connection errors
  useEffect(() => {
    socket.current = io('http://localhost:8800');
    socket.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      // Handle error or display a message to the user
    });
  }, []);

  useEffect(() => {
    if (divRef.current) {
      const divHeight = divRef.current.clientHeight;
      // console.log(divHeight);
    }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (!id) {
      return; // Make sure we have a valid id before emitting the event
    }
    socket.current.emit('new-user-added', id, (ack) => {
      // Acknowledgment received from the server, handle it if needed
    });
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    });

    // Unsubscribe from the socket event when the component unmounts
    return () => {
      socket.current.off('get-users');
    };
  }, [id]);

  // send msg to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  // receive msg from socket server
  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      setReceiveMessage(data);
    });

    // Unsubscribe from the socket event when the component unmounts
    return () => {
      socket.current.off('receive-message');
    };
  }, []);

  useEffect(() => {
    if (!id) {
      return; // Make sure we have a valid id before fetching chats
    }
    const getChats = async () => {
      try {
        const { data } = await getChat(id);
        setChats(data);
      } catch (error) {
        console.error('Error fetching chats:', error);
        // Handle error or display a message to the user
      }
    };
    getChats();

    // Unsubscribe from the socket event when the component unmounts
    return () => {
      socket.current.off('connect_error');
    };
  }, [id]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  // Additional improvements could include handling loading states, errors, and edge cases.
  // You can also debounce the handleSearch function to avoid excessive API calls.


  return (
    <>
      <div>
        <NavigationBarComponent />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6  gap-1 mt-16">
        <div className=" items-center justify-center h-full overflow-hidden md:col-span-1">
          <LeftSideBarComponent />
        </div>
        <div className="flex flex-col  gap-2 md:col-span-4 ">
          <Card>
            <div className=" items-center justify-center" ref={divRef}>
              <div className="my-custom-width-class h-100px">
                <ChatBoxComponent chat={currentChat} online = {onlineUsers} currentUserId={id} setSendMessage={setSendMessage} receiveMessage={receiveMessage}  />
              </div>
            </div>
          </Card>
        </div>

        <div className=" items-center justify-center md:col-span-1">
          <div className=" bg-gray-50 flex flex-col gap-2 h-auto">
            <h2 className="block font-semibold text-lg text-center">
              connections
            </h2>
            <div>
              <input
                className="text-center w-full border shadow-md"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="chatlist flex flex-col">
              {chats &&
                chats.map((chat) => (
                  <div onClick={() => setCurrentChat(chat)} className="">
                    <ConversationComponent
                      data={chat}
                      currentUserId={id}
                      online={checkOnlineStatus(chat)}
                      className="w-full"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
