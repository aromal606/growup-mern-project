
import mongoose from 'mongoose'
const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    content:{
        type:String,
    },
    dateAndTime:{
        type:String,
        required:true
    },
    imageName:{
        type: String, 
    },
    likes:{
        type:[String]
    },
    comments:{
        type:[String]
    },
    status:{
        type:String
    }
},{
    timestamps: true
});
export const postModel =mongoose.model("posts",postSchema)
