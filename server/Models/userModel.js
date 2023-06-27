import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    }, bio: {
        type: String,
        
    }, imageName: {
        type: String,
    },companyname:{
        type:String
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    workingOn:{
        type:[String]
    },
    number: {
        type: Number,
        required: [true, "number is required"],
        unique: true

    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    accounttype: {
        type: String,
        required: [true, "choose one"],

    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    blacklistedid:{
        type:Array,
        default:[]
    },
    status:{
        type:String,
        
    },
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            if (user.status === "Block") {
                throw Error("Sorry you are blocked by Admin");
            }
            return user;
        }
        throw Error("Incorrect password");
    }
    throw Error("Incorrect email");
};
export const userModel = mongoose.model("users", userSchema)