import  express  from "express";
import { chatFriends, createChat, findChat, userChats } from "../Controllers/chatController.js";

const routes = express.Router()
routes.post("/chat",createChat)
routes.get("/userchat/:userId",userChats)
routes.get("/findchat/:firstId/:secondId",findChat)
routes.get("/getchatfriends/:id",chatFriends)


  
export default routes 