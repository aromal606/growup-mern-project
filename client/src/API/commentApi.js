import { axiosConfig } from '../config/axiosConfig'
const commentApi = () => {

    const createComment = async (data) => {
        try {
            const response = await axiosConfig.post('/comment/createComment', { data })
            return response
        } catch (error) {
            return error
        }
    }


    const getComment = async (data) => {
        try {
            const response = await axiosConfig.post('/comment/getComment', { postId: data })
            return response
        } catch (error) {
            return error
        }
    }

    const getReplay = async (data) => {
        try {
            const response = await axiosConfig.post('/comment/getReplyComments', { commentId: data })
            return response

        } catch (error) {
            return error
        }
    }

    const sendReplay = async (data) => {
        try {

            const response = await axiosConfig.post('/comment/sendReply', { data })
            return response

        } catch (error) {
            return error
        }
    }

    return { createComment, getComment, sendReplay, getReplay }
}

export default commentApi