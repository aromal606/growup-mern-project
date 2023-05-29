import express  from 'express';
import { commentCount, createComment, getComment, getReplyComments, sendReply } from '../Controllers/commentController.js';
const routes=express.Router()
routes.post("/createComment",createComment)
routes.post("/getComment",getComment)
routes.post("/sendReply",sendReply)
routes.post("/getReplyComments", getReplyComments)
routes.post("/commentCount",commentCount)

export default routes;
