import express, { Router }  from 'express';
import {login,register,userPostShare,getPosts,getOtpPh, updateProfile, userProfileData, userData, likePost, getUsername, getUserPosts, deletePost, getPosterData, followUser, getSuggestions} from '../Controllers/authController.js'
const routes=express.Router()
import multer, { memoryStorage } from 'multer'
const storage = memoryStorage()
const upload = multer({ storage: storage })

routes.post("/")
routes.post("/login",login)
routes.post("/register",register) 
routes.post("/otp_login",getOtpPh)
routes.post("/userPostShare",upload.single("file"), userPostShare)
routes.get("/getPosts",getPosts)
routes.get("/getUserPosts/:id",getUserPosts)
routes.get("/getprofile/:id",userProfileData)
routes.get("/getUser/:id",userData)
routes.get("/getUsername/:id",getUsername)
routes.get("/getPosterData/:id",getPosterData)
routes.post("/updateprofile",upload.single("profilepicture"),updateProfile)
routes.post("/likepost",likePost)
routes.delete('/deletePost/:id',deletePost)
routes.get("/suggetions/:id",getSuggestions)
routes.put("/:id/follow",followUser)
export default routes;
