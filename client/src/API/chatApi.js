import  {axiosConfig} from '../config/axiosConfig'
const chatApi=()=>{
    const getChat=async(userId)=>{
        try {
            const response= await axiosConfig.get(`/userchat/${userId}`)
            return response
        } catch (error) {
            throw error;
            
        }
    }

    const getChatFriends = async(id)=>{
        try {
            const response = await axiosConfig.get(`/getchatfriends/${id}`)
            return response
        } catch (error) {
        }
    }

  

    return {getChat, getChatFriends}
}

export default chatApi
