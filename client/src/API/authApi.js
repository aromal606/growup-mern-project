import React from 'react'
// import axiosConfig from '../config/axiosConfig';
import  axiosConfigs from '../config/axiosConfig'
// import axiosConfig from '../config/axiosConfig'
import axios from 'axios';


const authAPI = ()=>{
    const login = async (logindata) =>{
        try{
            console.log('hi');
           console.log(logindata);
           const response = await axiosConfigs.post('/login', logindata)
           console.log('looo', response.data);
           return response.data
        }catch(err){
            // throw{msg: err.response.data.message}
            console.log(err);
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