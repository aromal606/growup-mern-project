import  axiosConfig from '../config/axiosConfig'
const axiosApi = ()=>{
    const login = async (logindata) =>{
        console.log(logindata,"p");
        try{
           const response = await axiosConfig.post('/login', logindata)
           console.log('looo', response);
           return response
        }catch(err){
            console.log("error");
            // throw{msg: err.response.data.message}
            console.log(err,"error");
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


    return { login, verifyEmail, sharePost, deletePost }
}

export default axiosApi;