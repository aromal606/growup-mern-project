import express from 'express'
import { addMessage, getMessages } from '../Controllers/messageController.js';
const routes=express.Router()


routes.post("/addmessage",addMessage)
routes.get("/getmessage/:chatId",getMessages)

export default routes;
