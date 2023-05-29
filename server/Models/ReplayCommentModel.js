import mongoose from "mongoose";
const ReplyCommentSchema = mongoose.Schema(
    {
        commentId:{
            type:String
        },
        userId:{
            type:String
        },
        comment:{
            type:String
        }
    },
    {
        timestamps:true
    }
)
export const  ReplyCommentModel=mongoose.model("ReplayComment",ReplyCommentSchema)