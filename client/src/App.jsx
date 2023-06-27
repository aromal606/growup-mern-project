import React from "react";
import { lazy, Suspense } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import ColorRingLoader from "./Components/Loader/ColorRingLoader";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/admin/login/LoginPage";
import axiosApi from "./API/axiosApi";

const userId = localStorage.getItem("id");
const Landingpage = lazy(() => import("./pages/User/LandingPage/Landingpage"));
const Login = lazy(() => import("./pages/User/Login/Login"));
const Register = lazy(() => import("./pages/User/SignUp/Register"));
const Logout = lazy(() => import("./pages/Logout"));
const HomePage = lazy(() => import("./pages/User/Home/homePage"));
const OtpLogin = lazy(() => import("./Components/User/OtpSection/OtpLogin"));
const UserProfilePage = lazy(() =>
  import("./pages/User/UserProfilePage/UserProfilePage")
);
const UpdateProfilePage = lazy(() =>
  import("./pages/User/UpdateProfilePage/UpdateProfilePage")
);
const UpdateProfileComponentUser = lazy(() =>
  import("./Components/User/UpdateProfile/UpdateProfileComponentUser")
);
const UsersListPage = lazy(() =>
  import("./pages/User/UsersList/UsersListPage")
);
const OtherProfile = lazy(() =>
  import("./Components/User/UserProfile/ProfileComponent")
);
const NotificationPage = lazy(() =>
  import("./pages/User/notificationpage/NotificationPage")
);
const OtherProfilePage = lazy(() =>
  import("./pages/User/UserProfilePage/OtherProfilePage")
);
const AdminDashboard = lazy(() => import("./pages/admin/home/HomePage"));
const Adminusers = lazy(() => import("./pages/admin/userslist/UserListPage"));
const AdminReports = lazy(() => import("./pages/admin/reportpage/AdminReportPage"));

const BlockPage = lazy(() => import("./pages/User/errors/BlockPage"));
const DropdownReport = lazy(() =>
  import("./pages/User/dropdownreportpage/DropdownReportpage")
);
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              <Landingpage />
            </Suspense>
          }
        />
        <Route
          exact
          path="/Login"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          exact
          path="/otpLogin"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              <OtpLogin />
            </Suspense>
          }
        />
        <Route
          exact
          path="/Register"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          exact
          path="/home"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              {/* {checkUser ? <HomePage /> : <BlockPage />} */}
              <HomePage />
            </Suspense>
          }
        />

        <Route
          exact
          path="/Logout"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              <Logout />
            </Suspense>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              {/* {checkUser ? <UserProfilePage /> : <BlockPage />} */}
              <UserProfilePage />
            </Suspense>
          }
        />
        <Route
          exact
          path="/report"
          elemet={
            <Suspense fallback={<ColorRingLoader />}>
              <DropdownReport />
            </Suspense>
          }
        />
         <Route
          exact
          path="/reports"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              {/* {checkUser ? <OtherProfilePage /> : <BlockPage />} */}
              <AdminReports />
            </Suspense>
          }
        />
        <Route
          exact
          path="/otherProfile/:id"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              {/* {checkUser ? <OtherProfilePage /> : <BlockPage />} */}
              <OtherProfilePage />
            </Suspense>
          }
        />

        <Route
          exact
          path="/updateprofile"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              {/* {checkUser ? <UpdateProfilePage /> : <BlockPage />} */}
              <UpdateProfilePage />
            </Suspense>
          }
        />
        <Route exact path="/update" element={<UpdateProfileComponentUser />} />
        <Route
          exact
          path="/userslist"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              {/* {checkUser ? <UsersListPage /> : <BlockPage />} */}
              <UsersListPage />
            </Suspense>
          }
        />
        <Route
          exact
          path="/notification"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              <NotificationPage />
            </Suspense>
          }
        />
        <Route
          exact
          path="/admin"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              <AdminDashboard />
            </Suspense>
          }
        />
        <Route
          exact
          path="/userDetails"
          element={
            <Suspense fallback={<ColorRingLoader />}>
              <Adminusers />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
