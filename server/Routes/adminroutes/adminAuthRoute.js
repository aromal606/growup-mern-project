import  express  from "express";
import { blockAPost, blockAUser, countAllPost, countAllUsers, dailyPost, getAllUsers, getPostStatus, getReportedPosts, getUserStatus, login, monthlyPost, yearlyPost } from "../../Controllers/adminController.js";
const routes =express.Router()



 routes.post('/login',login)
 routes.get("/users", getAllUsers)
 routes.post("/blockAUser", blockAUser)
 routes.get("/getuserstatus/:id", getUserStatus)
 routes.get("/getreportedposts", getReportedPosts)
 routes.post("/blockAPost",blockAPost)
 routes.post("/dailyPost",dailyPost)
 routes.get("/countallposts",countAllPost)
 routes.get("/countallusers",countAllUsers)
 routes.get("/dailypost",dailyPost)
 routes.get("/monthlypost",monthlyPost)
 routes.get("/yearlypost",yearlyPost)
 routes.get("/getpoststatus",getPostStatus)




 export default routes


