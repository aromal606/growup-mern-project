import { chatModel } from "../Models/chatModel.js";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();



const bucketName = process.env.VITE_BUCKET_NAME
const bucketRegion = process.env.VITE_BUCKET_REGION
const accessKey = process.env.VITE_ACCESS_KEY
const secretAccessKey = process.env.VITE_SECRET_ACCESS_KEY
const s3 = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});

export const createChat=async(req,res,next)=>{
    try {
        const newChat=new chatModel({
            members:[req.body.senderId, req.body.receiverId]
        })
        const result=await newChat.save()
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}
export const userChats=async(req,res,next)=>{
   
    try {
            const chat=await chatModel.find({
                members:{$in:[req.params.userId]}
            })
            res.status(200).send(chat)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const findChat=async(req,res,next)=>{
    try {
        const chat=await chatModel.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.status(200).send(chat)
    } catch (error) {
        res.status(500).send(error)
        
    }

} 



export const chatFriends = async (req, res, next) => {
   
    console.log(req.params.id);
  
    // try { 
    //   const userData = [];
      
    //   for (const id of req.params.id) {
    //     const user = await userModel.findById(id);
    //     const getObjectParams = {
    //       Bucket: bucketName,
    //       Key: user[0].imageName,
    //     };
    //     const command = new GetObjectCommand(getObjectParams);
    //     const url = await getSignedUrl(s3, command, { expiresIn: 36000 });
    //     user[0].imageName = url;
    //     userData.push({ name: user[0].name, profilePic: user[0].imageName });
    //   }
    //   console.log(userData);
    //   res.status(200).json(userData);
    // } catch (error) {
    //  console.log(error);
    // }
  };
  



// const chat = await chatModel.aggregate([
//     {
//         $match: {
//             members: req.params.userId
//         }
//     },
//     {
//         $project: {
//             chatId: "$_id",
//             friendId: {
//                 $arrayElemAt: [
//                     {
//                         $filter: {
//                             input: "$members",
//                             cond: { $ne: ["$$this", req.params.userId] }
//                         }
//                     }, 0]
//             }
//         }
//     }]);
// res.status(200).send(chat)
// } catch (error) {
// res.status(500).send(error)
// }
// }