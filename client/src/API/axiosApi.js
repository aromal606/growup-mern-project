
import { axiosConfig } from '../config/axiosConfig'
const axiosApi = () => {
    const login = async (logindata) => {
        try {
            const response = await axiosConfig.post('/login', logindata)
            return response
        } catch (err) {
            throw { msg: err.response.data }
        }
    }
    const otpLogin = async (data) => {
        try {
            const response = await axiosConfig.post('/otp_login', { ph: data })
            return response

        } catch (error) {
            throw error
        }
    }

    const verifyEmail = async (dataURL) => {
        try {
            const response = await axiosConfig.post('/login', dataURL)
            return response.data
        } catch (err) {
            throw { msg: err.response.data.message }
        }
    }

    const verifyUser = async (userId) => {
        try {
            const response = await axiosConfig.get(`/verifyuser/${userId}`)
            return response.data
        } catch (error) {
            throw error

        }
    }

    const sharePost = async (postedResponse) => {
        try {
            const response = await axiosConfig.post('/userPostShare', postedResponse)
            return response
        } catch (error) {
            throw { msg: error.message }

        }
    }
    const likePost = async (postId, userId) => {
        try {
            const response = await axiosConfig.post('/likepost', { postId, userId })
            return response;
        } catch (error) {
            throw error

        }
    }

    const getPosts = async () => {
        try {
            const response = await axiosConfig.get('/getPosts')
            return response
        } catch (error) {
            throw error
        }
    }

    const deletePost = async (postId) => {
        try {
            const response = await axiosConfig.delete(`/deletePost/${postId}`)
            return response
        } catch (error) {
            throw { msg: error.message }
        }
    }
    const getFollowers = async (id) => {
        try {
            const response = await axiosConfig.get(`/getFollowers/${id}`)
            return response
        } catch (error) {
            throw { msg: error.message }

        }
    }
    const getFollowings = async (id) => {
        try {
            const response = await axiosConfig.get(`getFollowings/${id}`)
            return response
        } catch (error) {
            throw { msg: error.message }

        }
    }
    const unFollowUser = async (id, myId) => {

        try {
            const response = await axiosConfig.post(`unFollowUser/${id}`, { myId })
            return response
        } catch (error) {
            throw error
        }
    }
    const followUser = async (id, myId) => {
        try {
            const response = await axiosConfig.post(`followUsers/${id}`, { myId })
            return response
        } catch (error) {
            throw error
        }
    }
    const getNotification = async (id) => {
        try {
            const response = await axiosConfig.get(`/getnotification/${id}`)
            return response
        } catch (error) {
            throw error
        }
    }

    const getAllUsers = async (id) => {
        try {
            const response = await axiosConfig.get(`/getallusers/${id}`)
            return response
        } catch (error) {
            throw error
        }
    }

    const removeSuggetion = async (Id, id) => {
        try {
            const response = await axiosConfig.post(`/removesuggetion/${Id}`, { id })
            return response
        } catch (error) {
            throw error
        }
    }
    const reportPost = async (data) => {

        try {
            const response = await axiosConfig.post('/reportpost', data)
            return response
        } catch (error) {
            throw error
        }
    }

    const userDatas = async (id) => {
        try {
            const response = await axiosConfig.get(`/getusers/${id}`)
            return response
        } catch (error) {
            throw error
        }
    }
    const getuserPosts = async (id) => {
        try {
            const response = await axiosConfig.get(`/getUserPosts/${id}`)
            return response
        } catch (error) {
            console.log(error);
        }

    }
    const getsuggestion = async(id)=>{

        try {
            const response = await axiosConfig.get(`/suggestions/${id}`)
            return response
        } catch (error) {
            return error            
        }
    }

    const getProfile = async(id)=>{
        try {
            const response = await axiosConfig.get(`getprofile/${id}`)
            return response
        } catch (error) {
            return error            
        }
    }   
    const updateProfile = async (data)=>{
    
        try {
            const response = await axiosConfig.post('/updateprofile',data)
            return response
        } catch (error) {
            return error
        }
    }
    const getNameAndData = async(id)=>{
        try {
            const response = await axiosConfig.get(`/getPosterData/${id}`)
            return response
        } catch (error) {
            return error
        }
    }




    return { login, otpLogin, getNameAndData, getProfile, updateProfile, getsuggestion, getuserPosts, verifyEmail, verifyUser, sharePost, likePost, getPosts, deletePost, getFollowers, getFollowings, unFollowUser, followUser, userDatas, getNotification, getAllUsers, removeSuggetion, reportPost }
}

export default axiosApi;