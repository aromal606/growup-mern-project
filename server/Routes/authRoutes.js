import express  from 'express';
import {login,register,userPostShare,getPosts,getOtpPh, updateProfile, userProfileData, userData, likePost, getUsername} from '../Controllers/authController.js'
const routes=express.Router()
import multer, { memoryStorage } from 'multer'
const storage = memoryStorage()
const upload = multer({ storage: storage })

routes.post("/")
routes.post("/register",register) 
routes.post("/login",login)
routes.post("/userPostShare",upload.single("file"), userPostShare)
routes.get("/getPosts",getPosts)
routes.get("/getprofile/:id",userProfileData)
routes.post("/otp_login",getOtpPh)
routes.get("/getUser/:id",userData)
routes.post("/getUsername",getUsername)
routes.post("/updateprofile",upload.single("profilepicture"),updateProfile)
routes.post("/likepost",likePost)
export default routes;
