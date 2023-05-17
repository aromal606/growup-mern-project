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
        username:"",
        loading:false,
        success:false,
        
    },
    reducers:{
        setLogin: (state, action) => {
        state.user = action.payload.user;
        state.username=action.payload.username
        state.email=action.payload.email
      },
      setLogout:(state)=>{
        state.user=null
        state.token=null

      }
  

    }
})
export const {setLogin,setLogout}=authSlice.actions
export default authSlice.reducer;