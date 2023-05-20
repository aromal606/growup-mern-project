import React, { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../../Card/Card";
const UpdateProfileComponentUser = () => {
  const id = localStorage.getItem("id");
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("id");

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
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    about: Yup.string().required("mention about yourself"),
    profilepicture: Yup.mixed()
      .test("fileType", "Invalid file format", (value) => {
        if (!value) return true; // Allow empty value (no file selected)
        return ["image/jpeg", "image/png"].includes(value.type);
      })
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true; // Allow empty value (no file selected)
        return value.size <= 5 * 1024 * 1024; // 5MB limit (adjust as needed)
      }),
    companyname: Yup.string().required("Company name is required"),
    checkbox: Yup.array().min(1, "Select at least one checkbox"),
  });
  const checkboxOptions = [
    { value: "Vue JS", label: "Vue JS" },
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "Laravel", label: "Laravel" },
  ];
  console.log(userData.name);
  const [imagePreview, setimagePreview] = useState(false);
  const initialValues = {
    name: userData.name || "",
    email: userData.email || "",
    about: userData.about || "",
    profilepicture: "",
    companyname: userData.companyname || "",
    checkbox: userData.workingOn || "",
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
    values.checkbox.forEach((checkboxValue) => {
      formData.append("checkbox", checkboxValue);
    });

    formData.append("userId", id);
    console.log(formData);
    const response = await axios.post(
      "http://localhost:4000/updateprofile",
      formData
    );

    if (response) {
      if (response.status === 201) {
        navigate("/profile");
      } else {
        console.log("2");
      }
    } else {
      console.log("3");
    }

    console.log(response);
  };
  if (Object.keys(userData).length === 0) {
    // Render a loading state or return null while data is being fetched
    return <div>Loading...</div>;
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      encType="multipart/form-data"
    >
      {({ handleSubmit }) => (
        <div className="md:grid grid-cols gap-2 px-10">
          <Card>
            <div className="section flex border justify-center">
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
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500"
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
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500"
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
                        <ErrorMessage
                          name="companyname"
                          component="div"
                          className="text-red-500"
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
                        <ErrorMessage
                          name="profilepicture"
                          component="div"
                          className="text-red-500"
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
                      <ErrorMessage
                        name="about"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      {checkboxOptions.map((option) => (
                        <div key={option.value} className=" items-center pl-3">
                          {/* <ul className="border"> */}
                            {/* <li> */}
                              <Field
                                type="checkbox"
                                name="checkbox"
                                value={option.value}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              />
                              <label
                                htmlFor={`${option.value}-checkbox-list`}
                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                {option.label}
                              </label>
                            {/* </li> */}
                          {/* </ul> */}
                        </div>
                      ))}
                      <ErrorMessage
                        name="checkbox"
                        component="div"
                        className="text-red-500"
                      />
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
          </Card>
        </div>
      )}
    </Formik>
  );
};

export default UpdateProfileComponentUser;
