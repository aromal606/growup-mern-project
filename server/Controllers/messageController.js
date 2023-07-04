import { messageModel } from "../Models/messageModel.js";

export const addMessage=async(req,res,next)=>{
    const {senderId, text, chatId}=req.body.data
    try {
        const message= new messageModel({
            senderId,
            text,
            chatId,
        })
        const result= await message.save();
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}
export const getMessages=async(req,res,next)=>{
    const {chatId} = req.params
    try {
        const result= await messageModel.find({chatId})
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
        
    }
}