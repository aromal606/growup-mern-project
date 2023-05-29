import mongoose from "mongoose";
const CommentSchema = mongoose.Schema(
    {
        postId: {
            type: String
        },
        commenterId: {
            type: String
        },
        comment: {
            type: String,
            required:true
        },
        replyComments: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
)
export const commentModel=mongoose.model('comment',CommentSchema)