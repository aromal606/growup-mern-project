import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../../../src/Animation/loginAnimation.json";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/images/talentF-c.png";
import axiosApi from "../../../API/axiosApi";
import { setLogin } from "../../../../redux/features/authSlice";

const Login = () => {
  // Rename the function to Login (capitalized)
  const token = localStorage.getItem("token");
  const usertype = localStorage.getItem("usertype");
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const { login: apiLogin } = axiosApi(); // Rename the constant to apiLogin

  useEffect(() => {
    if (token) {
      if (usertype === "client") {
        navigate("/home");
      }
      if (usertype === "freelancer") {
        navigate("/home");
      }
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!formValues.email) {
      setFormError("email is required");
    } else if (!regex.test(formValues.email)) {
      setFormError("enter a valid email");
    } else if (!formValues.password) {
      setFormError("password is required");
    } else if (
      formValues.password.length < 6 ||
      formValues.password.length > 12
    ) {
      setFormError("Password must be between 6 to 12 characters");
    } else {
      try {
        const response = await apiLogin(formValues); 
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("usertype", response.data.user.accounttype);
          localStorage.setItem("id", response.data.user._id);
          dispatch(
            setLogin({
              user: response.data.user._id,
              username: response.data.user.name,
              email: response.data.user.email,
            })
          );
          navigate("/home");
        
      } catch (error) {
        toast.error(error.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
      }
    }
  };

  return (
    <div>
      <>
        <section className="bg-white-50 min-h-screen flex items-center justify-center">
          <div className="bg-white-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
            <div className="md:block hidden w-1/2">
              <div className="flex justify-center ">
                {/* <img src={logo} className="w-40" alt="logo" /> */}
              </div>
              <Lottie animationData={loginAnimation} loop={true} />
            </div>

            <div className="md:w-1/2 px-8 md:px-16">
              <div className="w-full mb-4 flex justify-center">
                <img src={logo} className="w-36 md:hidden " alt="logo" />
              </div>
              <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
              <p className="text-xs mt-4 mb-4 text-[#002D74]">
                If you are already a member, easily log in
              </p>
        <ToastContainer />

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    className="peer p-2  rounded-xl border w-full placeholder-transparent text-gray-500 focus:outline-none"
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 -top-3  text-gray-500 transition-all   
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer p-2 rounded-xl border  w-full placeholder-transparent text-gray-500 focus:outline-none"
                    autoComplete="off"
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute -top-3 left-4  text-gray-500 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "
                  >
                    Password
                  </label>
                </div>
                {formError && (
                  <p className="text-sm text-red-700 rounded-lg" role="alert">
                    {formError}
                  </p>
                )}

                <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                  Login
                </button>
              </form>

              <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                <hr className="border-gray-400" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-400" />
              </div>

              <Link to={"/otpLogin"}>
                <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                  <span className="cursor-pointer">click to OTP login</span>
                </div>
              </Link>
              {/* <Link to={"/forgotPassword"}>
                <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                  <span className="cursor-pointer">Forgot your password?</span>
                </div>
              </Link> */}

              <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                <p>Don't have an account?</p>
                <Link to={"/register"}>
                  <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default Login;
