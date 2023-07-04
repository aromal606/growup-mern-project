import { axiosConfig } from "../config/axiosConfig";
const messageApi =()=>{
    const getMessages=async(id)=>{
        try {
          const response=await axiosConfig.get(`/getmessage/${id}`)
          return response  
        } catch (error) {
            throw error
        }
    }

    const addMessages = async (data) =>{
        try {
            const response= await axiosConfig.post(`/addmessage`,{data})
            return response
        } catch (error) {
           return(error,"message send error");
        }
    }


    return({getMessages, addMessages})
}
export default messageApi