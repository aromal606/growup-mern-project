import React from "react";
import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ColorRingLoader from "./Components/Loader/ColorRingLoader";
import "react-toastify/dist/ReactToastify.css"

const Landingpage = lazy(() => import('./pages/User/LandingPage/Landingpage'));
const Login = lazy(() => import('./pages/User/Login/Login'));
const Register = lazy(() => import('./pages/User/SignUp/Register'));
const Logout = lazy(() => import('./pages/Logout'));
const HomePage = lazy(() => import('./pages/User/Home/homePage'));
const OtpLogin = lazy(() => import('./Components/User/OtpSection/OtpLogin'));
const UserProfilePage = lazy(() => import('./pages/User/UserProfilePage/UserProfilePage'));
const UpdateProfilePage = lazy(() => import('./pages/User/UpdateProfilePage/UpdateProfilePage'));
const UpdateProfileComponentUser = lazy(() => import('./Components/User/UpdateProfile/UpdateProfileComponentUser'));
const UsersListPage = lazy(()=> import('./pages/User/UsersList/UsersListPage'))
const OtherProfile=lazy(()=> import('./Components/User/UserProfile/ProfileComponent'))
const NotificationPage=lazy(()=>import('./pages/User/notificationpage/NotificationPage'))
const OtherProfilePage=lazy(()=>import('./pages/User/UserProfilePage/OtherProfilePage'))
const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
            <Suspense fallback={<ColorRingLoader />}>
              <Landingpage />
            </Suspense>
          } />
        <Route exact path="/Login" element={
            <Suspense fallback={<ColorRingLoader />}>
              <Login />
            </Suspense>
          } />
        <Route exact path="/otpLogin" element={
            <Suspense fallback={<ColorRingLoader />}>
              <OtpLogin />
            </Suspense>
          } />
        <Route exact path="/Register" element={
            <Suspense fallback={<ColorRingLoader />}>
              <Register />
            </Suspense>
          } />
        <Route exact path="/home" element={
            <Suspense fallback={<ColorRingLoader />}>
              <HomePage />
            </Suspense>
          } />
        <Route exact path="/Logout"element={
            <Suspense fallback={<ColorRingLoader />}>
              <Logout />
            </Suspense>
          } />
        <Route exact path="/profile" element={
            <Suspense fallback={<ColorRingLoader />}>
              <UserProfilePage />
            </Suspense>
          } />
        <Route exact path="/otherProfile/:id" element={
            <Suspense fallback={<ColorRingLoader />}>
              <OtherProfilePage />
            </Suspense>
          } />

        <Route exact path="/updateprofile" element={
            <Suspense fallback={<ColorRingLoader />}>
              <UpdateProfilePage />
            </Suspense>
          } />
        <Route exact path="/update" element={<UpdateProfileComponentUser />} />
        <Route exact path="/userslist" element={
            <Suspense fallback={<ColorRingLoader />}>
              <UsersListPage />
            </Suspense>
          } />
          <Route exact path="/notification" element={
            <Suspense fallback={<ColorRingLoader />}>
              <NotificationPage />
            </Suspense>
          } />
          
      </Routes>
    </BrowserRouter>
  );
};

export default App;






// import React from "react";
// import "./App.css";
// import { lazy, Suspense } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import LazyLoader from "./Components/Loader/LazyLoader.jsx";

// // import Landingpage from "./pages/User/LandingPage/Landingpage";
// // import Login from "./pages/User/Login/Login";
// // import Register from "./pages/User/SignUp/Register";
// // import Logout from "./pages/Logout";
// // import HomePage from "./pages/User/Home/homePage";
// // import OtpLogin from "./Components/User/OtpSection/OtpLogin";
// // import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
// // import UpdateProfilePage from "./pages/User/UpdateProfilePage/UpdateProfilePage";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setLogin } from "../redux/features/authSlice";
// // import UpdateProfileComponentUser from "./Components/User/UpdateProfile/UpdateProfileComponentUser";
// const App = () => {
//   const Landingpage = lazy(() =>
//     import("./pages/User/LandingPage/Landingpage")
//   );
//   const Login = lazy(() => import("./pages/User/Login/Login"));
//   const Register = lazy(() => import("./pages/User/SignUp/Register"));
//   const Logout = lazy(() => import("./pages/Logout"));
//   const HomePage = lazy(() => import("./pages/User/Home/homePage"));
//   const OtpLogin = lazy(() => import("./Components/User/OtpSection/OtpLogin"));
//   const UserProfilePage = lazy(() =>
//     import("./pages/UserProfilePage/UserProfilePage")
//   );
//   const UpdateProfilePage = lazy(() =>
//     import("./pages/User/UpdateProfilePage/UpdateProfilePage")
//   );
//   const UpdateProfileComponentUser = lazy(() =>
//     import("./Components/User/UpdateProfile/UpdateProfileComponentUser")
//   );

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           exact
//           path="/"
//           element={
//             <Suspense fallback={<LodignSpinners />}>
//               <Landingpage />
//             </Suspense>
//           }
//         />
//         <Route
//           exact
//           path="/Login"
//           element={
//             <Suspense fallback={<LodignSpinners />}>
//               <Login />
//             </Suspense>
//           }
//         />
//         <Route exact path="/otpLogin" element={<OtpLogin />} />
//         <Route
//           exact
//           path="/Register"
//           element={
//             <Suspense fallback={<LodignSpinners />}>
//               <Register />
//             </Suspense>
//           }
//         />
//         <Route
//           exact
//           path="/home"
//           element={
//             <Suspense fallback={<LodignSpinners />}>
//               <HomePage />
//             </Suspense>
//           }
//         />
//         <Route exact path="/Logout" element={<Logout />} />
//         <Route
//           exact
//           path="/profile"
//           element={
//             <Suspense fallback={<LodignSpinners />}>
//               <UpdateProfilePage />
//             </Suspense>
//           }
//         />
//         <Route
//           exact
//           path="/updateprofile"
//           element={
//             <Suspense fallback={<LodignSpinners />}>
//               <UserProfilePage />
//             </Suspense>
//           }
//         />
//         <Route exact path="/update" element={<UpdateProfileComponentUser />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
