// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landingpage from './pages/User/LandingPage/Landingpage'
import Login from './pages/User/Login/Login'
import Register from './pages/User/SignUp/Register'
import Logout from './pages/Logout'
import './App.css'
import HomePage from './pages/User/Home/homePage'
import OtpLogin from './Components/User/OtpSection/OtpLogin'
import UserProfilePage from './pages/UserProfilePage/UserProfilePage'
import UpdateProfilePage from './pages/User/UpdateProfilePage/UpdateProfilePage'
import { useDispatch, useSelector } from 'react-redux'
import {setLogin} from '../redux/features/authSlice'
import UpdateProfileComponentUser from './Components/User/UpdateProfile/UpdateProfileComponentUser'
const App = () => {  
//   const dispatch = useDispatch();


//   const verifyUser = async ()=>{
//       const {data} = await axios.post(
//         "http://localhost:4000",{},
//         {withCredentials: true}
//         );
        
//         dispatch(setLogin({user:data?.user?._id}))
//       }
      
//       useEffect(() => {
//         verifyUser()
//       }, [])

  return (
     <BrowserRouter>
     <Routes>
      <Route exact path="/" element={<Landingpage/>}/>
      <Route exact path="/Login" element={<Login/>}/>
      <Route exact path="/otpLogin" element={<OtpLogin/>}/>
      <Route exact path="/Register" element={<Register/>}/>
    <Route exact path="/home" element={<HomePage/>}/>
      <Route exact path="/Logout" element={<Logout/>}/>
      <Route exact path="/profile" element={<UserProfilePage/>}/>
      <Route exact path="/updateprofile" element={<UpdateProfilePage/>}/>
      <Route exact path="/update" element={<UpdateProfileComponentUser/>}/>
     </Routes>
     </BrowserRouter>
  )
}

export default App