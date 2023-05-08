import express  from 'express';
import {login,register,userPostShare,getPosts,getOtpPh} from '../Controllers/authController.js'
const routes=express.Router()
import multer, { memoryStorage } from 'multer'
const storage = memoryStorage()
const upload = multer({ storage: storage })

routes.post("/")
routes.post("/register",register) 
routes.post("/login",login)
routes.post("/userPostShare",upload.single("file"), userPostShare)
routes.get("/getPosts",getPosts)
routes.post("/otp_login",getOtpPh)
export default routes;
