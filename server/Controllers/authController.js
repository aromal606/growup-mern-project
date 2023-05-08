import {userModel} from '../Models/userModel.js'
import{postModel} from '../Models/PostModel.js'
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import sharp from "sharp";
// ---------creating random names for storing images/videos in s3 bucket-----------
const randomName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
// const bucketName = process.env.BUCKET_NAME
// const bucketRegion = process.env.BUCKET_REGION
// const accessKey = process.env.ACCESS_KEY
// const SecretAccessKey = process.env.SECRET_ACCESS_KEY
const bucketName = 'userpostingdata'
const bucketRegion = 'ap-south-1'
const accessKey = 'AKIA4JF6RM5HVIGNXMC4'
const secretAccessKey = '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'
const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
});


    import jwt from "jsonwebtoken";
    import { LocalStorage } from "node-localstorage";
    const localStorage = new LocalStorage("./scratch");
const maxAge = 3 * 24 * 60 * 60
const createTocken = (id) => {
    return jwt.sign({ id }, "jwtsecretkey", {
        expiresIn: maxAge
    })
}

const handleErrors = (err) => {

    let errors = { email: "", number: "" }
    if (err.code === 11000 && err.keyPattern.number) {
        console.log(err.keyPattern.number);
        errors.number = "mob number already registered"
        return errors.number
    }
    if (err.code === 11000 && err.keyPattern.email) {
        errors.email = "email is already registerd"
        return errors.email

    }

    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
}


export const login = async (req, res, next) => {
    
    try {
        console.log("gygygyg",req.body);
        const { email, password, accounttype } = req.body;
        const user = await userModel.login(email, password, accounttype)
        console.log(user, 'usert');
        // const token = createTocken(user._id)
        // localStorage.setItem({ "id": user._id })
        res.json(user)
        // res.status(200).json({ user: user._id, accounttype: user.accounttype, created: true, token: token })
    } catch (err) {
        if (err.message === "Incorrect password") {
            res.status(400).json({ error: "Incorrect password" });
        } else {
            res.status(400).json({ error: "Incorrect email" });
        }
    }
}



export const register = async (req, res, next) => {
    try {
        const { name, email, number, password, accounttype } = req.body;
        console.log(req.body);
        const user = await userModel.create({ name, email, number, password, accounttype })

        const token = createTocken(user._id)

        res.status(201).json({ user: user._id, created: true, accounttype: user.accounttype, email: user.email })
    } catch (err) {
        console.log(err)
        const errors = handleErrors(err)
        res.json({ errors, created: false })
    }
}

export const userPostShare = async (req, res, next) => {
 console.log(req.file);
    // resizing image -----------
    try {
    if (req.file) {
        const buffer = await sharp(req.file.buffer).resize({
            width: 1080,
            height: 1080,
            fit: "contain"
        }).toBuffer()
        const imageName = randomName()
        const params = {
            Bucket: bucketName,
            Key: imageName,
            Body: buffer,
            ContentType: req.file.mimetype
        }
        const command = new PutObjectCommand(params)
            const content = req.body.caption
           const userId=req.body.userid
            console.log(userId);
            const dateAndTime = new Date();
            const status = "active"

            await s3.send(command)
            const post = await postModel.create({
                userId,
                imageName,
                content,
                dateAndTime,
                status
            })

        } else {
            {
                const post = await postModel.create({
                    userId,
                content,
                dateAndTime, 
            })
            res.status(201).send(post)
        }

    }
} catch (error) {
    console.log(error);
}
}

// -------------------getPost-------------------------

export const getPosts = async (req,res,next)=>{
    console.log("ghjgj");
    
    try {
        const posts = await postModel.find({}).sort({ _id: -1 })
        for(let i = 0; i < posts.length; i++){
            const getObjectParams={
                Bucket:bucketName,
                Key:posts[i].imageName,
            }
            const command=new GetObjectCommand(getObjectParams)
            const url=await getSignedUrl(s3, command,{expiresIn:36000})
            posts[i].imageName=url
            // console.log(url);
            // console.log(posts);
        }
        res.send(posts)
    } catch (error) {
        console.log(error);
    }
}

export const getOtpPh=async (req,res,next)=>{
    const number=req.body.ph
    const splitNumber=number.slice(-10)
    console.log(splitNumber);
    console.log(number);
    try {
        const verifyNumber=await userModel.findOne({number:splitNumber})
        if(verifyNumber){
            console.log(verifyNumber);
            res.status(200).json(verifyNumber);
        }else {
            console.log("Number not found in the database");
            res.status(404).send("Number not found in the database");
          }
    } catch (error) {
      console.log(error);  
      res.status(500).send("Internal Server Error");
    }
}

// ---------------likePost------------
// module.exports.likePost = async (req,res,next)=>{
//     try {
//           let value = null
//           const userId = req.body.userId;
//           const notification = "Liked";
//           const post = await PostModel.findById(req.body.postId)
//           const senderId = post.userId
//           const likedPost = post.likes.find((id)=>id == req.body.userId)
//           if(!likedPost){
//             post.likes.push(req.body.userId)
  
//             NotificationModel.create({
//               userId,
//               senderId,
//               notification
//             })
  
//             await NotifiCounterModel.updateOne(
//               { userId: senderId }, 
//               { $inc: { counter: 1 }}
//             );
  
//             value = {value:true}
//             }else{
//             post.likes.pull(req.body.userId)
//             value = {value:false}
//           }
//           post.save()
//           res.status(201).send({likes:post.likes.length,value})
//       } catch (error) {
//           console.log(error);
//       }
//   }

