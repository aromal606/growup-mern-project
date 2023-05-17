import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UpdateProfileComponent = () => {
  const id = localStorage.getItem("id");
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/getprofile/${id}`
        );
        console.log(response.data, "22");
        if (response.data.length > 0) {
          setUserData(response.data[0]); // Access the first element of the array
        }
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData();
  }, []);
  console.log(userData);
  const navigate = useNavigate();
  const [imagePreview, setimagePreview] = useState(false);
  const initialValues = {
    name: userData.name || "",
    email: "",
    about: "",
    profilepicture: "",
    companyname: "",
    checkbox: "",
  };
  const onSubmit = async (values) => {
    console.log(values.checkbox);
    const formData = new FormData();
    console.log(imagePreview, "2");
    formData.append("profilepicture", imagePreview);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("about", values.about);
    formData.append("companyname", values.companyname);
    formData.append("checkbox", values.checkbox);
    formData.append("userId", id);
    console.log(formData);
    const response = await axios.post(
      "http://localhost:4000/updateprofile",
      formData
    );
    try {
      if (response) {
        if (response.status === 201) {
          navigate("/home");
        } else {
          console.log();
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }

  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      encType="multipart/form-data"
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <div className="md:grid grid-cols-2 gap-2 px-10">
          <div className="section flex justify-center">
            <div className=" ">
              <h1 className="font-bold text-2xl py-2 flex justify-center items-center text-blue-500">
                Update Your Profile
              </h1>
              {/* <ProfileUpdate /> */}
              <div>
                <div className="flex justify-center items-center">
                  <div className="h-28 w-28 rounded-full border-2 border-blue-500 bg-gray-500 overflow-hidden ">
                    {imagePreview ? (
                      <img
                        className="object-cover w-full h-full"
                        src={URL.createObjectURL(imagePreview)}
                        alt=""
                      />
                    ) : null}
                  </div>
                </div>
                <Form className="mt-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <Field
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                        value={userData.name} // Set value from userData if available, otherwise use initial value
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <Field
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={userData.email}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="company"
                      >
                        Company
                      </label>
                      <Field
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="companyname"
                        type="text"
                        id="companyname"
                        placeholder="company name or startup name"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="profilepicture"
                      >
                        Add profile pic
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                        type="file"
                        name="profilepicture"
                        onChange={(event) => {
                          setimagePreview(event.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="about"
                    >
                      About
                    </label>
                    <Field
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="about"
                      id="about"
                      placeholder="add about.."
                    />
                  </div>
                  <div className="">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="checkboxData"
                    >
                      Working At
                    </label>
                    <ul className=" grid grid-cols-2   items-center w-full text-sm font-medium text-gray-900 bg-white border-gray-200 rounded-lg sm:grid md:grid-cols-5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <label
                            htmlFor="vue-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            <Field
                              type="checkbox"
                              name="checkbox"
                              // id="checkbox1"
                              value="Vue JS"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            Vue JS
                          </label>
                        </div>
                      </li>

                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <Field
                            type="checkbox"
                            name="checkbox"
                            id="checkbox2"
                            value="react"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="react-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            React
                          </label>
                        </div>
                      </li>
                      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <Field
                            type="checkbox"
                            name="checkbox"
                            id="checkbox3"
                            value="angular"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="angular-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Angular
                          </label>
                        </div>
                      </li>
                      <li className="w-full dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <Field
                            type="checkbox"
                            name="checkbox"
                            id="checkbox4"
                            value="Laravel"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="laravel-checkbox-list"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Laravel
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center items-center mt-10">
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Update
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="formContent md:block hidden">
            <img
              src="https://img.freepik.com/free-vector/personal-site-concept-illustration_114360-2577.jpg?w=740&t=st=1683965854~exp=1683966454~hmac=e320f458f29be5022972c6ffa506c4f03347866c15f7ad54e8bb2c291bffce13"
              alt=""
            />
          </div>
        </div>
      )}
    </Formik>
  );
};

export default UpdateProfileComponent;
