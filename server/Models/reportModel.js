import mongoose from 'mongoose'

const reportSchema = mongoose.Schema(
    {
        userId:{
            type:String
        },
        postId:{
            type:String
        },
        reason:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
)



export const ReportModel = mongoose.model("Report", reportSchema)