import  axiosConfig from '../config/axiosConfig'
const authAPI = ()=>{
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

    return { login, verifyEmail }
}

export default authAPI;