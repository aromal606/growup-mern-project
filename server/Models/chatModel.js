import mongoose from "mongoose";
const chatSchema = mongoose.Schema({
    members: {
        type: Array,
    },
},
    {
        timestamps: true,
    }

)
export const chatModel=mongoose.model("chat",chatSchema)
