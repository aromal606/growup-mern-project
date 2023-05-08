import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
export const Login=createAsyncThunk("auth/login",async()=>{
    try {
        
    } catch (error) {
        console.log(error);
    }
})
const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:null,
        token:null,
        email:"",
        accounttype:"",
        error:"",
        loading:false,
        success:false,
        
    }
})

export default authSlice.reducer;