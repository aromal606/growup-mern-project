import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
export const Login=createAsyncThunk("auth/login",async()=>{
    try {
        
    } catch (error) {
        throw error
    }
})
const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:null,
        userId:null,
        token:null,
        email:"",
        accounttype:"",
        error:"",
        username:"",
        loading:false,
        success:false,
        
    },
    reducers:{
        setLogin: (state, action) => {
        state.user = action.payload.user;
        state.username=action.payload.username
        state.email=action.payload.email
        state.userId=action.payload.userId
      },
      setLogout:(state)=>{
        state.user=null
        state.token=null

      }
  

    },
    verify:{
        
    }
})
export const {setLogin,setLogout}=authSlice.actions
export default authSlice.reducer;