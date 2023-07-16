import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import profilepicture from "../../../bagroundImages/profilePic.png";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../../API/axiosApi";
import Card from "../../Card/Card";
import basicSchema from "./validationSchema";
const UpdateProfileComponent = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const { getProfile, updateProfile } = axiosApi();
  const [userData, setUserData] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [updatedProPic, setUpdatedProPic] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [profilePicFile, setProfilePicFile] = useState(null);

  // Set a predefined image URL here
  const predefinedImage = profilepicture;

  const formData = new FormData();

  const getProfilePictureAsFile = async () => {
    try {
      const response = await fetch(profilepicture);
      const blob = await response.blob();
      return new File([blob], "profilePic.png", { type: "image/png" });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the profile picture as a file
        const profilePictureFile = await getProfilePictureAsFile();
        setProfilePicFile(profilePictureFile); // Accessing the file object
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Create a new Blob object from the predefined image URL
      const preProPic = await fetch(predefinedImage).then((res) => res.blob());
      setProfilePic(URL.createObjectURL(preProPic));
      try {
        const response = await getProfile(id);
        if (response.data.userData.length > 0) {
          setUserData(response.data.userData[0]);
          setIsDataLoaded(true); // Access the first element of the array
        }
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (values) => {
    // console.log(values);
    if (!updatedProPic) {
      formData.append("profilepicture", profilePicFile);
    } else {
      formData.append("profilepicture", updatedProPic);
    }

    // Append other form fields to formData
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("about", values.about);
    formData.append("companyname", values.companyname);
    formData.append("number", values.phone);
    formData.append("checkbox", values.checked);
    formData.append("userId", id);

    const response = await updateProfile(formData);
    console.log(response, "updateprofile response");

    try {
      if (response) {
        if (response.status === 201) {
          navigate("/home");
        } else {
          console.log(response);
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.number || "",
      profilepicture: "",
      about: "",
      checked: [],
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  return (
    isDataLoaded && (
      <div className="md:grid grid-cols gap-2 px-10">
        <Card>
          <div className="section flex border justify-center">
            <div className="">
              <h1 className="font-bold text-2xl py-2 flex justify-center items-center text-blue-500">
                Complete Your Profile
              </h1>

              <div>
                <form className="mt-10" onSubmit={handleSubmit}>
                  <div className="flex justify-center items-center">
                    <div
                      className="h-28 w-28 rounded-full border-2 border-green-500
                    bg-gray-500 overflow-hidden -mt-6"
                    >
                      {updatedProPic ? (
                        <img
                          className="object-cover w-full h-full"
                          src={URL.createObjectURL(updatedProPic)}
                          alt="profilePicture"
                        />
                      ) : (
                        <img
                          className="object-cover w-full h-full"
                          src={profilePic}
                          alt="profilePicture"
                        />
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="mt-">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full 
                        py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <span className="text-red-500">{errors.name}</span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full
                         py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="email"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <span className="text-red-500">{errors.email}</span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 ">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="company"
                      >
                        Company
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full
                         py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="companyname"
                        type="text"
                        id="companyname"
                        placeholder="company name or startup name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="phone"
                      >
                        Mob no
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full
                         py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="phone"
                        type="text"
                        id="number"
                        value={values.phone}
                        placeholder="update number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.phone && (
                        <span className="text-red-500">{errors.phone}</span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="profilepicture"
                      >
                        Add profile pic
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2
                         px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                        type="file"
                        name="profilepicture"
                        onChange={(event) => {
                          setUpdatedProPic(event.target.files[0]);
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
                    <input
                      className="shadow appearance-none
                       border rounded w-full py-2 px-3
                        text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="about"
                      id="about"
                      placeholder="add about.."
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.about && (
                      <span className="text-red-500">{errors.about}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <p>Known as</p>
                    </div>
                    <div className="flex">
                      <label className="w-full flex gap-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                        <div>
                          <input
                            type="checkbox"
                            name="checked"
                            value="react"
                            checked={values.checked.includes("react")}
                            onChange={handleChange}
                          />
                        </div>
                        react
                      </label>
                      <label className="w-full flex gap-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                        <div>
                          <input
                            type="checkbox"
                            name="checked"
                            value="angular"
                            checked={values.checked.includes("angular")}
                            onChange={handleChange}
                          />
                        </div>
                        angular
                      </label>
                      <label className="w-full flex gap-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                        <input
                          type="checkbox"
                          name="checked"
                          value="javaScript"
                          checked={values.checked.includes("javaScript")}
                          onChange={handleChange}
                        />
                        javaScript
                      </label>
                      <label className="w-full flex gap-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                        <input
                          type="checkbox"
                          name="checked"
                          value="python"
                          checked={values.checked.includes("python")}
                          onChange={handleChange}
                        />
                        python
                      </label>
                      <label className="w-full flex gap-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                        <input
                          type="checkbox"
                          name="checked"
                          value="laravel"
                          checked={values.checked.includes("laravel")}
                          onChange={handleChange}
                        />
                        laravel
                      </label>
                    </div>
                    {errors.checked && (
                      <span className="text-red-500">{errors.checked}</span>
                    )}
                  </div>

                  <div className="flex justify-center items-center mt-10">
                    <button
                      type="submit"
                      className="text-white bg-blue-700
                       hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
                       font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
                        dark:bg-blue-600 dark:hover:bg-blue-700 
                        focus:outline-none dark:focus:ring-blue-800"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  );
};

export default UpdateProfileComponent;
