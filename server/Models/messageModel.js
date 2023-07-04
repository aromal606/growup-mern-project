import mongoose from "mongoose";
const messageSchema= new mongoose.Schema({
chatId:{
    type:String,
},
    senderId:{
        type: String,
    },
    text:{
        type:String,
        required:true,
    },
},{
    timestamps : true,
}

)
export const messageModel=mongoose.model("message",messageSchema)