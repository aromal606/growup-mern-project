import React from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../../../src/Animation/loginAnimation.json";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../../assets/images/talentF-c.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import adminAxiosApi from "../../../API/adminAxiosApi";

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short - should be 4 chars min"),
});

const initialValues = {
  email: "",
  password: "",
};

const LoginComponent = () => {
const {login}=adminAxiosApi()
const navigate = useNavigate();


  const handleSubmit =async (values) => {
    try {
      const response=await login(values)
      if (response.status === 201) {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        
      }
      if (response.status === 200) {
        localStorage.setItem("admintoken", response.data.token);
        localStorage.setItem("adminid", response.data.admin._id);
        
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={handleSubmit}
    >
      <div>
        <section className="bg-gray-500 min-h-screen flex items-center justify-center">
          <div className="bg-gray-300 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
            <div className="md:block hidden w-1/2">
              <Lottie animationData={loginAnimation} loop={true} />
            </div>

            <div className="md:w-1/2 px-8 md:px-16">
              <div className="w-full mb-4 flex justify-center">
                <img src={logo} className="w-36 md:hidden " alt="logo" />
              </div>
              <h2 className="font-bold text-2xl text-[#002D74] mb-2 text-center">
                Admin Login
              </h2>

              <ToastContainer />

              <Form className="flex flex-col gap-4">
                <div className="relative">
                  <Field
                    className="peer p-2 rounded-xl border w-full placeholder-transparent text-gray-500 focus:outline-none"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 -top-3 text-gray-500 transition-all   
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                peer-focus:-top-3 peer-focus:text-gray-500"
                  >
                    Email
                  </label>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />

                <div className="relative">
                  <Field
                    className="peer p-2 rounded-xl border w-full placeholder-transparent text-gray-500 focus:outline-none"
                    autoComplete="off"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute -top-3 left-4 text-gray-500 transition-all  
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2
                peer-focus:-top-3 peer-focus:text-gray-500"
                  >
                    Password
                  </label>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />

                <button
                  type="submit"
                  className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                >
                  Login
                </button>
              </Form>
            </div>
          </div>
        </section>
      </div>
    </Formik>
  );
};

export default LoginComponent;
