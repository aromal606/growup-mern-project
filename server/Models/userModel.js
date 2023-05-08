import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],          
    }, 
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    number:{
        type:Number,
        required:[true,"number is required"],
        unique:true
       
    },
    password:{
        type:String,
        required:[true, "password is required"],
    },
    accounttype:{
        type:String,
        required:[true,"choose one"],
         
    },
})
userSchema.pre("save", async function (next){
    const salt= await bcrypt.genSalt()
    this.password= await bcrypt.hash(this.password,salt)
})
userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user;
        } 
        throw Error("Incorrect password")
    }
    throw Error("Incorrect Email") 
} 
export const userModel =mongoose.model("users",userSchema)