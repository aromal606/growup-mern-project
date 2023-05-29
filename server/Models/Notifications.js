import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
   postId:{
    type:mongoose.Schema.Types.ObjectId,
    default:null
   },
    senderName:{
    type:Object,
    require:true
   },
   receiverId:{
    type:mongoose.Schema.Types.ObjectId,
    require:true
   },
   read:{
    type:Boolean,
    default:false
   },
   message:{
    type:String,
    require: true
   }
},
    { timestamps: true }
);
export const notification = mongoose.model('Notification', NotificationSchema)
