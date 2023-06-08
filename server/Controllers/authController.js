import { userModel } from '../Models/userModel.js'
import { postModel } from '../Models/PostModel.js'
import { notification } from '../Models/Notifications.js'
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import sharp from "sharp";
import bcrypt from 'bcrypt'


import jwt from "jsonwebtoken";
const maxAge = 10 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({ id }, "jwtsecretkey", {
    expiresIn: maxAge
  })
}

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



const handleErrors = (err) => {

  let errors = { email: "", number: "" }
  if (err.code === 11000 && err.keyPattern.number) {
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
    const { email, password } = req.body;
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    if (err.message === "Incorrect password") {
      res.status(201).json({ message: "Incorrect password" });
    } else {
      res.status(201).json({ message: "Incorrect email" });
    }
  }
};





export const register = async (req, res, next) => {
  try {
    const { name, email, number, accounttype } = req.body;
    let password = req.body.password;
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt)
    const user = await userModel.create({ name, email, number, password, accounttype })
    const token = createToken(user._id)
    res.status(201).json({ user, token })
    // res.status(201).json({ user: user._id, created: true, accounttype: user.accounttype, email: user.email })
  } catch (err) {
    const errors = handleErrors(err)
    res.json({ errors, created: false })
  }
}



// module.exports.register = async (req,res,next)=>{

//   const name = req.body.name
//   const lastName = req.body.lastName
//   const email = req.body.email
//   let password = req.body.password
//   const phoneno = req.body.phoneno
//   const status = "Block"

//   try{
//       if(req.file){
//           const file = req.file
//           const imageName = generateFileName()

//           const fileBuffer = await sharp(file.buffer)
//             .resize({ height: 1000, width: 1000, fit: "contain" })
//             .toBuffer()
//           await uploadFile(fileBuffer, imageName, file.mimetype)

//           const salt = await bcrypt.genSalt();
//           password = await bcrypt.hash(password,salt)

//           const post = await UserModel.create({
//               name,
//               lastName,
//               email,
//               imageName,
//               password,
//               phoneno,
//               status,
//           })

//           const token = createToken(post._id);

//               await NotifiCounterModel.create({
//                   userId:post._id,
//                   counter:0
//               })

//               res.cookie("jwt",token,{
//               withCredentials:true,
//               httpOnly: false,
//               maxAge:maxAge*1000
//           })
//           res.status(201).json({user:post._id, created:true})
//       }else{
//           const imageName = process.env.DEFAULT_IMAGE

//           const salt = await bcrypt.genSalt();
//           password = await bcrypt.hash(password,salt)

//           const post = await UserModel.create({
//               name,
//               lastName,
//               email,
//               imageName,
//               password,
//               phoneno,
//               status,
//           })

//           const token = createToken(post._id);

//           await NotifiCounterModel.create({
//               userid:post._id,
//               counter:0
//           })

//               res.cookie("jwt",token,{
//               withCredentials:true,
//               httpOnly: false,
//               maxAge:maxAge*1000
//           })
//           res.status(201).json({user:post._id, created:true}) 
//       }
//   }catch(err){
//       const errors = handleErrors(err)
//       res.json({errors,created: false})
//   }
// }





export const userPostShare = async (req, res, next) => {
  try {
    if (req.file) {
      const buffer = await sharp(req.file.buffer)
        .resize({
          width: 1080,
          height: 1080,
          fit: "contain",
        })
        .toBuffer();
      const imageName = randomName();
      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);
      const { caption, userid } = req.body;
      const dateAndTime = new Date();
      const status = "active";

      await s3.send(command);
      const post = await postModel.create({
        userId: userid,
        imageName,
        content: caption,
        dateAndTime,
        status,
      });

      res.status(201).send(post);
    } else {
      const { caption, userid } = req.body;
      const dateAndTime = new Date();
      const status = "active";

      const post = await postModel.create({
        userId: userid,
        content: caption,
        dateAndTime,
        status,
      });
      res.status(201).send(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};























export const uploadFile = (fileBuffer, fileName, mimetype) => {

  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,

  }

  return s3.send(new PutObjectCommand(uploadParams));
}

export const deleteFile = (fileName) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  }

  return s3.send(new DeleteObjectCommand(deleteParams));
}


// update profile---------------------

export const updateProfile = async (req, res, next) => {
  try {
    //   const checkboxValues = req.body.checkbox.split(',');
    const updateData = {};
    if (req.body.name !== '') {
      updateData.name = req.body.name;
    }
    if (req.body.email !== '') {
      updateData.email = req.body.email;
    }
    if (req.body.phone !== '') {
      updateData.phone = req.body.phone;
    }
    if (req.file) {
      const file = req.file;
      const imageName = randomName();
      const fileBuffer = await sharp(file.buffer)
        .resize({ height: 1000, width: 1000, fit: "contain" })
        .toBuffer();
      await uploadFile(fileBuffer, imageName, file.mimetype);
      updateData.imageName = imageName;
    }
    if (req.body.about !== '') {
      updateData.bio = req.body.about;
    }
    if (req.body.companyname !== '') {
      updateData.companyname = req.body.companyname;
    }
    if (req.body.checkbox.length > 0) {
      updateData.workingOn = req.body.checkbox;
    } else {
      // Retrieve the previous checkbox values and assign them if no checkboxes are selected
      const user = await userModel.find({ _id: req.body.userId });
      updateData.workingOn = user.workingOn;
    }
    await userModel.findOneAndUpdate(
      { _id: req.body.userId },
      { $set: updateData },
      { new: true }
    );
    res.status(201).json({ created: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// -------------------getPost-------------------------

export const getPosts = async (req, res, next) => {
  try {
    const posts = await postModel.find({}).sort({ _id: -1 });

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].imageName) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: posts[i].imageName,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 36000 });
        posts[i].imageName = url;
      }
    }

    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
// get profile data--------------------


export const userProfileData = async (req, res, next) => {

  try {
    const userData = await userModel.find({ _id: req.params.id })
    if (userData && userData.length > 0) {
      if (userData[0].imageName !== null && userData[0].imageName !== undefined) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: userData[0].imageName,
        }
        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(s3, command, { expiresIn: 36000 })
        userData[0].imageName = url
      } 
      res.status(201).json(userData)
    } else {
      res.status(401)
    }
  } catch (error) {
    console.log(error);
  }
}

export const getUserPosts = async (req, res, next) => {
  try {
    const posts = await postModel.find({ userId: req.params.id }).sort({ _id: -1 })
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].imageName) {

        const getObjectParams = {
          Bucket: bucketName,
          Key: posts[i].imageName,
        }
        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(s3, command, { expiresIn: 36000 })
        posts[i].imageName = url
      }
    }
    res.send(posts)
  } catch (error) {
    console.log(error);
  }
}
// get user---------------------------

export const userData = async (req, res, next) => {
}

export const getUsername = async (req, res, next) => {

  try {

    const userName = await userModel.find({ _id: req.params.id });
    const getObjectParams = {
      Bucket: bucketName,
      Key: userName[0].imageName,
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, { expiresIn: 36000 })
    userName[0].imageName = url
    res.status(200).json({ name: userName[0].name, profilePic: userName[0].imageName });
  } catch (error) {
    console.log(error);
  }
}

export const getPosterData = async (req, res, next) => {
  try {

    const userName = await userModel.find({ _id: req.params.id });
    // console.log(userName[0].imageName);
    const getObjectParams = {
      Bucket: bucketName,
      Key: userName[0].imageName,
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, { expiresIn: 36000 })
    userName[0].imageName = url
    res.status(200).json({ name: userName[0].name, profilePic: userName[0].imageName });
  } catch (error) {
    console.log(error);
  }
}

export const getOtpPh = async (req, res, next) => {
  const number = req.body.ph
  const splitNumber = number.slice(-10)
  try {
    const verifyNumber = await userModel.findOne({ number: splitNumber })
    if (verifyNumber) {
      const token = createToken(verifyNumber._id)
      res.status(200).json({ verifyNumber, token });
    } else {
      console.log("Number not found in the database");
      res.status(400).send("Number not found in the database");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}



// ---------------likePost------------
export const likePost = async (req, res, next) => {
  try {
    let value = null;
    const currentUser = await userModel.findOne({ _id: req.body.userId })
    const post = await postModel.findById(req.body.postId);
    console.log(post.userId, "tt");
    const likedPost = post.likes.find((id) => id == req.body.userId);
    if (!likedPost) {
      const newNotification = new notification({
        senderName: currentUser,
        receiverId: post.userId,
        postId:req.body.postId,
        message: 'liked your post'
      })
      newNotification.save()
      post.likes.push(req.body.userId);
      value = { value: true };
    } else {
      post.likes.pull(req.body.userId);
      value = { value: false };
    }
    await post.save();
    res.status(201).send({ likes: post.likes.length, value });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (post) {
      const response = await postModel.findByIdAndDelete(req.params.id);
      res.status(200).send(response);
    }
  } catch (error) {

  }
}


 
export const followUser = async (req, res) => {

  try {
    if (req.body.id !== req.params.id) {
      try {
        const user = await userModel.findOne({ _id: req.params.id })
        const currentUser = await userModel.findById(req.body.id)
        if (!user.followers.includes(req.body.id)) {
          await user.updateOne({ $push: { followers: req.body.id } })
          await currentUser.updateOne({ $push: { followings: req.params.id } })
          const newNotification = new notification({
            senderName: currentUser,
            receiverId: user,
            message: 'started following you'
          })
          newNotification.save()
          return res.status(200).send(user)
        }
        else {
          res.send('you already follow this user')
        }
      } catch (err) {
        console.log(err);
        return res.status(403)
      }
    } else {
      return res.send('you cant follow yourself')
    }
  } catch (error) {
    console.log(error);
  }
}

export const followUsers = async (req, res) => {
  try {
    if (req.body.myId !== req.params.id) {
      try {
        const user = await userModel.findOne({ _id: req.params.id })
        const currentUser = await userModel.findById(req.body.myId)
        if (!user.followers.includes(req.body.myId)) {
          await user.updateOne({ $push: { followers: req.body.myId } })
          await currentUser.updateOne({ $push: { followings: req.params.id } })
          const newNotification = new notification({
            senderName: currentUser,
            receiverId: user,
            message: 'started following you'
          })
          newNotification.save()
          return res.status(200).send(user)
        }
        else {
          res.status(403).send('you already follow this user')
        }
      } catch (err) {
        console.log(err);
        return res.status(403)
      }
    } else {
      return res.status(403).send('you cant follow yourself')
    }
  } catch (error) {
    console.log(error);
  }
}

export const unFollowUser = async (req, res) => {
  try {
    if (req.body.myId !== req.params.id) {
      const user = await userModel.findById(req.params.id);
      const currentUser = await userModel.findById(req.body.myId);
      // Remove the myId from the followers array of the user
      user.followers.pull(req.body.myId);
      await user.save();

      // Remove the id from the followings array of the current user
      currentUser.followings.pull(req.params.id);
      await currentUser.save();
      return res.status(200).send('User has been unfollowed');
    } else {
      return res.status(403).send('You cannot unfollow yourself');
    }
  } catch (err) {
    return res.status(500).send(err);
  }
}


export const getFollowers = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId);
    const followerIds = user.followers; // Retrieve the follower ids from your own user data
    const followers = await userModel.find({ _id: { $in: followerIds } });

    for (let i = 0; i < followers.length; i++) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: followers[i].imageName, // Use followers[i] instead of followers[0]
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 36000 });
      followers[i].imageName = url;
    }
    res.status(201).send(followers);
  } catch (error) {
    res.send(error);
  }
};

export const getFollowings = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await userModel.findById(userId);
    const followingIds = user.followings; // Retrieve the follower ids from your own user data
    const followings = await userModel.find({ _id: { $in: followingIds } });

    for (let i = 0; i < followings.length; i++) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: followings[i].imageName, // Use followers[i] instead of followers[0]
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 36000 });
      followings[i].imageName = url;
    }
    res.status(201).send(followings);
  } catch (error) {
    res.send(error);
  }

}


export const getSuggestions = async (req, res, next) => {
  try {
    const userDetails = await userModel.findById(req.params.id);
    const otherUsers = await userModel
      .find({
        $and: [
          { _id: { $ne: userDetails._id } },
          { _id: { $nin: userDetails.followings } },
          { _id: { $nin: userDetails.followers } },
        ],
      })
      .sort({ createdAt: -1 })
      .limit(5);
    const updatedUsers = await Promise.all(
      otherUsers.map(async (user) => {
        if (user.imageName !== null && user.imageName !== undefined) {
          const getObjectParams = {
            Bucket: bucketName,
            Key: user.imageName,
          };
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 36000 });
          user.imageName = url;
        }
        return user;
      })
    );

    res.status(200).json(updatedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNotification=async(req,res,next)=>{
  try {
    const response=await notification.find({receiverId:req.params.id}).sort({_id:-1})
    // const response=await notification.aggregate([{$group : {_id:receiverId}}])
    // console.log(response);
    res.status(200).send(response)
  } catch (error) {
    console.log(error);
  }
}

export const getAllUsers=async(req,res,next)=>{
  const id=req.params.id
  try {
    const response = await userModel.find({ _id: { $ne: id } });
    for (let i = 0; i < response.length; i++) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: response[i].imageName,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 36000 });
      response[i].imageName = url;
    }
    res.send(response)
  } catch (error) {
    console.log(error);
  }
}










