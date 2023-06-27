import  {axiosConfig} from '../config/axiosConfig'
const axiosApi = ()=>{
    const login = async (logindata) =>{
        try{
           const response = await axiosConfig.post('/login', logindata)
           return response
        }catch(err){
            throw{msg:err.response.data}
        }
    }

    const verifyEmail = async (dataURL) => {
        try{
            const response = await axiosConfig.post('/login', dataURL)
            return response.data
        }catch(err) {
            throw{msg: err.response.data.message}
        }
    }

    const verifyUser=async(userId)=>{
        try {
            const response=await axiosConfig.get(`/verifyuser/${userId}`)
            return response.data
        } catch (error) {
            console.log(error);
            throw{msg: err.response.data}

        }
    }

    const sharePost=async(postedResponse)=>{
        try {
           const response=await axiosConfig.post('/userPostShare',postedResponse) 
           return response
        } catch (error) {
            throw{msg: error.message}
            
        }
    }
    const deletePost=async(postId)=>{
        try {
            const response=await axiosConfig.delete(`/deletePost/${postId}`)
            return response
        } catch (error) {
            throw{msg:error.message}
        }
    }
    const getFollowers=async(id)=>{
        try {
            const response=await axiosConfig.get(`/getFollowers/${id}`)
            return response
        } catch (error) {
            throw{msg:error.message}
            
        }
    }
    const getFollowings=async(id)=>{
        try {
            const response=await axiosConfig.get(`getFollowings/${id}`)
            return response
        } catch (error) {
            throw{msg:error.message}
            
        }
    }
    const unFollowUser=async(id,myId)=>{
        console.log(id,myId,"UnFollowUser axiosApi");

        try {
            const response=await axiosConfig.post(`unFollowUser/${id}`,{myId})
            return response
        } catch (error) {
            console.log(error);
        }
    }
    const followUser=async(id,myId)=>{
        console.log(id,myId);
        try {
            const response=await axiosConfig.post(`followUsers/${id}`,{myId})
            console.log(response,"axiosApi");
            return response
        } catch (error) {
            console.log(error);
        }
    }
    const getNotification=async(id)=>{
        try {
            const response=await axiosConfig.get(`/getnotification/${id}`)
            return response
        } catch (error) {
           console.log(error); 
        }
    }

    const getAllUsers=async(id)=>{
        try {
            const response=await axiosConfig.get(`/getallusers/${id}`)
            return response
        } catch (error) {
            console.log(error);
        }
    }

    const removeSuggetion=async(Id,id)=>{
        try {
            const response=await axiosConfig.post(`/removesuggetion/${Id}`,{id})
            console.log(response,"axiosApi");
            return response
        } catch (error) {
            console.log(error);
        }
    }
    const reportPost=async(data)=>{
        
        console.log(data,"jjj");
        try {
            const response=await axiosConfig.post('/reportpost',data)
            return response
        } catch (error) {
            console.log(error);
        }
    }


    return { login, verifyEmail,verifyUser, sharePost, deletePost, getFollowers, getFollowings, unFollowUser, followUser, getNotification, getAllUsers, removeSuggetion, reportPost }
}

export default axiosApi;