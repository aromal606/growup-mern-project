import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Lottie from 'lottie-react'
import registrationAnimation from '../../../../src/Animation/registrationAnimation.json'
import logo from "../../../assets/images/talentF-c.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch,useSelector} from 'react-redux'
import { setLogin } from "../../../../redux/features/authSlice";

function SignUp() {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [formvalues, setFormValues] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formError, setFormError] = useState("");
  const onSubmit = async (formData) => {
    setFormValues(formData);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...formData,
        },
        {
          withcredentials: true,
        }
      );
      if (data) {
        if (data.errors) {
          toast.error(data.errors, {
            position: toast.POSITION.TOP_RIGHT
        });
        } else {
          localStorage.setItem('id',data.user._id)
          localStorage.setItem('token',data.token)
          dispatch(setLogin({
            userId:data.user._id,
          }))
          toast.success('Registration successful !', {
            position: toast.POSITION.TOP_RIGHT
        });
          navigate("/updateprofile");
        }
      }
    } catch (e) {
      console.log(e.message);
      toast.error('Network Error Occured !', {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  };
  return (
    <>
      <section className="bg-white-50 min-h-screen flex items-center justify-center">
        <div className="bg-white-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:block hidden w-1/2 ">
            <div className="flex justify-center ">
              {/* <img src={logo} className="w-40" alt="logo" /> */}
            </div>
            <Lottie animationData={registrationAnimation} loop={true} />
          </div>
          <div className="md:w-1/2 px-8 md:px-16">
            <div className="w-full mb-4 flex justify-center">
              <img src={logo} className="w-36 md:hidden " alt="logo" />
            </div>

            <h2 className="font-bold text-2xl text-[#002D74] pb-5">
              Create Account
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              >
              <ToastContainer/>
              <div className="relative">
                <input
                  placeholder="fullname"
                  className="peer p-2  rounded-xl border   w-full placeholder-transparent text-gray-500 focus:outline-none"
                  type="text"
                  name="name"
                  {...register("name", {
                    required: "full name is required",
                    pattern: {
                      value: /(?=^.{0,40}$)^[a-zA-Z-]+\s[a-zA-Z-]+$/,
                      message: "Provide Full Name",
                    },
                  })}
                />
                <label
                  htmlFor="name"
                  className="absolute -top-3 left-4  text-gray-800 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "
                >
                  fullname*
                </label>
                <p className="text-sm text-red-700">{errors.name?.message}</p>
              </div>

              <div className="relative">
                <input
                  className="peer p-2  rounded-xl border focus:outline-none  w-full placeholder-transparent text-gray-500"
                  type="text"
                  name="userName"
                  {...register("userName", {
                    required: "User Name is required",
                    pattern: {
                      value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
                      message: "invalid userName",
                    },
                  })}
                  placeholder="username "
                />
                <label
                  htmlFor="userName"
                  className="absolute -top-3 left-4  text-gray-800 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "
                >
                  userName*
                </label>
                <p className="text-sm text-red-700">
                  {errors.userName?.message}
                </p>
              </div>

              <div className="relative">
                <input
                  className="peer p-2 rounded-xl border w-full focus:outline-none placeholder-transparent text-gray-500"
                  type="email"
                  name="email"
                  {...register("email", {
                    required: "email is required",

                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "invalid email ",
                    },
                  })}
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-3  text-gray-500 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "
                >
                  Email*
                </label>
                <p className="text-sm text-red-700">{errors.email?.message}</p>
              </div>
              <div className="relative">
                <input
                  className="peer p-2 rounded-xl border focus:outline-none w-full placeholder-transparent text-gray-500"
                  type="number"
                  name="number"
                  {...register("number", {
                    required: "phone number required",
                    pattern: {
                      value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                      message: "invalid Phone number format ",
                    },
                  })}
                  placeholder="Phone"
                />
                <label
                  htmlFor="phone"
                  className="absolute -top-3 left-4  text-gray-500 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "
                >
                  Phone*
                </label>
                <p className="text-sm text-red-700">
                  {errors?.number?.message}
                </p>
              </div>
              <div className="relative">
                <input
                  className="peer p-2 rounded-xl border focus:outline-none w-full placeholder-transparent text-gray-500"
                  type="password"
                  name="password"
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value: /^(?=.*[a-zA-Z]).{8,12}$/,
                      message: "password must be 6 to 14 characters ",
                    },
                  })}
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute -top-3 left-4  text-gray-500 transition-all  
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                  peer-focus:-top-3 peer-focus:text-gray-500 "
                >
                  Password*
                </label>
                <p className="text-sm text-red-700">
                  {errors?.password?.message}
                </p>
              </div>
              <label htmlFor="account-type" className="text-gray-500">
                Account Type
              </label>
              <div className="flex justify-between ">
                <div className="mr-2">
                  <input
                    type="radio"
                    name="accounttype"
                    className="mr-1"
                    {...register("accounttype", {
                      required: "Select any account type",
                    })}
                    value="client"
                  />
                  <span className="text-gray-500">
                    Client, hiring for project
                  </span>
                </div>
                <div>
                  <input
                    type="radio"
                    name="accounttype"
                    className="mr-1"
                    {...register("accounttype", {
                      required: "Select any account type",
                    })}
                    value="freelancer"
                  />
                  <span className="text-gray-500">
                    Freelancer looking for job
                  </span>
                </div>
              </div>
              <p className="text-sm text-red-700">
                {errors?.accounttype?.message}
              </p>
              {formError && (
                <p className="text-sm text-red-700 rounded-lg" role="alert">
                  {formError}
                </p>
              )}
              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                Signup
              </button>
            </form>

            <div className="mt-2 text-xs flex justify-between items-center text-[#002D74]">
              <p>Already have an account?</p>
              <Link to={"/login"}>
                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
