import express, { json } from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import authRoute from "./Routes/authRoutes.js"
import commentRoute from "./Routes/commentRoute.js"
const app = express()
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
const { json: _json, urlencoded } = bodyParser;
   
app.listen(4000, () => {  
    console.log("server started port 4000"); 
})
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE','PUT'],
    credentials: 'true',
})
)   
app.use(_json({limit:"30mb", extended:true}))
app.use(urlencoded({limit: "30mb", extended:true}))
   
connect("mongodb://127.0.0.1/project-growup",{
    useNewUrlparser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("database connection success");
}).catch((err)=>{
    console.log(err.message); 
})

app.use(cookieParser())
app.use(json());
app.use("/",authRoute)
app.use("/comment",commentRoute)