import React, { useEffect, useRef, useState } from "react";
import Card from "../../../Components/Card/Card";
import NavigationBarComponent from "../../../Components/User/Navigationbar/NavigationBarComponent";
import LeftSideBarComponent from "../../../Components/User/Leftsidebar/LeftSideBarComponent";
import chatApi from "../../../API/chatApi";
import ConversationComponent from "../../../Components/User/conversation/ConversationComponent";
import ChatBoxComponent from "../../../Components/User/chatbox/ChatBoxComponent";
import {io} from 'socket.io-client'

const Chat = () => {
  const socket = useRef()
  const { getChat } = chatApi();
  const id = localStorage.getItem("id");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  
  
  useEffect(()=>{
    socket.current = io('http://localhost:8800')
    socket.current.emit('new-user-added', id)
    socket.current.on('get-users', (users)=>{
      setOnlineUsers(users)
    })
  },[socket])

    // send msg to socket server
  
    useEffect(()=>{
      if(sendMessage !== null){
        socket.current.emit('send-message', sendMessage)
      }
    },[sendMessage])
  
  // receive msg from socket server

  useEffect(()=>{
    socket.current.on('receive-message', (data)=>{
      setReceiveMessage(data)
    })
  },[])


  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await getChat(id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [id]);

  const checkOnlineStatus = (chat)=>{
    const chatMember = chat.members.find((member)=> member!== id)
    const online = onlineUsers.find((user)=> user.userId === chatMember)
    return online ? true:false
  }


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
            <div className=" items-center justify-center" >
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
                  <div key={chat._id} onClick={() => setCurrentChat(chat)} className="">
                    <ConversationComponent
                      data={chat}
                      currentUserId={id}
                      online={checkOnlineStatus(chat)}
                      className="w-full"
                    />
                   { console.log(chats,"12")}
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
