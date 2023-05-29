import { commentModel } from '../Models/CommentModel.js';
import { ReplyCommentModel } from '../Models/ReplayCommentModel.js';

export const createComment = async (req, res, next) => {
    try {
        const comment = await commentModel.create(req.body)
        res.status(201).send(comment)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getComment = async (req, res, next) => {
    try {
        const comment = await commentModel.find({ postId: req.body.postId }).sort({ _id: -1 })
        res.status(201).send(comment)
    } catch (error) {
        res.status(500).send(error)
    }
}



export const getReplyComments = async (req, res, next) => {
    try {
        const replyComment = await ReplyCommentModel.find({ commentId: req.body.commentId }).sort({ _id: -1 })
        res.status(200).send(replyComment)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const sendReply = async (req, res, next) => {
    try {
        const { data } = await ReplyCommentModel.create(req.body)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const commentCount = async (req, res, next) => {
    try {
        var total = 0
        const data = await commentModel.find({ postId: req.body.postId })
        const mainComment = data.length
        for (let i = 0; i < data.length; i++) {
            const reply = await ReplyCommentModel.find({ commentId: data[i]._id })
            total += reply.length
        }
        total = total + mainComment
        res.status(200).json(total)
    } catch (error) {
        res.status(500).json(error)
    }
}
