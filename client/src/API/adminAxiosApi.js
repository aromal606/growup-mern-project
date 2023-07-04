import {adminAxiosConfig} from "../config/axiosConfig";
const adminAxiosApi=()=>{
    const login=async(loginData)=>{
        try {
            const response=await adminAxiosConfig.post('/login',loginData)
           return response
        } catch (error) {
            return error
        }
    } 
    const getAllUser=async()=>{
        try {
            const response=await adminAxiosConfig.get('/users')
           return response
        } catch (error) {
            return error
        }
    }
    const blockAUser=async(userId)=>{
        try {
            const response=await adminAxiosConfig.post('/blockAUser',{userId:userId})
           return response
        } catch (error) {
            return error
        }
    }
    const getUserStatus=async(userId)=>{
        try {
            const response=await adminAxiosConfig.get(`/getuserstatus/${userId}`)
            return response
        } catch (error) {
            return(error);
        }
    }
    const countAllPosts=async()=>{
        try {
            const response=await adminAxiosConfig.get('/countallposts')
            return response

        } catch (error) {
            return error
        }
    }
    const countAllUsers=async()=>{
        try {
            const response=await adminAxiosConfig.get('/countallusers')
            return response
        } catch (error) {
            return error

        }
    }
    const dailyPost=async()=>{
        try {
            const response=await adminAxiosConfig.get('/dailypost')
            return response

        } catch (error) {
            return error

        }
    }
    const monthlyPost=async()=>{
        try {
            const response=await adminAxiosConfig.get('/monthlypost')
            return response

        } catch (error) {
            return error

        }
    }
    const yearlyPost=async()=>{
        try {
            const response=await adminAxiosConfig.get('/yearlypost')
            return response

        } catch (error) {
            return error

        }
    }
    const getReportedPosts=async()=>{
        try {
            const response=await adminAxiosConfig.get('/getreportedposts')
            return response
        } catch (error) {
            return error

        }
    }
    const blockAPost=async(id)=>{
        try {
            const response=await adminAxiosConfig.post('/blockAPost',{id:id})
            return response
        } catch (error) {
            throw error
        }
    }

    return {login, getAllUser, blockAUser,getUserStatus, countAllPosts,countAllUsers,dailyPost,monthlyPost,yearlyPost, getReportedPosts, blockAPost}
}
export default adminAxiosApi;



