import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../../API/axiosApi";
import Card from "../../Card/Card";
import basicSchema from "./validationSchema";

const UpdateProfileComponentUser = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const { getProfile, updateProfile } = axiosApi();
  const [userData, setUserData] = useState({});
  const [updatedProPic, setUpdatedProPic] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Set a predefined image URL here

  const formData = new FormData();

  useEffect(() => {
    const fetchData = async () => {
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
    formData.append("profilepicture", updatedProPic);

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
          navigate("/profile");
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
      profilepicture: userData.imageName || "",
      companyname: userData.companyname || "",
      about: userData.bio || "",
      checked:userData.workingOn || [],
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  console.log(userData);
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
                          src={values.profilepicture}
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
                        value={values.companyname}
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
                      value={values.about}
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

export default UpdateProfileComponentUser;

// if (Object.keys(userData).length === 0) {
//   // Render a loading state or return null while data is being fetched
//   return <div>Loading...</div>;
// }

// const id = localStorage.getItem("id");
// const [userData, setUserData] = useState({});
// useEffect(() => {
//   const fetchData = async () => {
//     const id = localStorage.getItem("id");

//     try {
//       const response = await axios.get(
//         `http://localhost:4000/getprofile/${id}`
//       );
//       console.log(response.data, "22");
//       if (response.data.length > 0) {
//         setUserData(response.data[0]); // Access the first element of the array
//       }
//     } catch (error) {
//       // Handle error
//       console.log(error);
//     }
//   };

//   fetchData();
// }, []);
// const navigate = useNavigate();
// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   about: Yup.string().required("mention about yourself"),
//   profilepicture: Yup.mixed()
//     .test("fileType", "Invalid file format", (value) => {
//       if (!value) return true; // Allow empty value (no file selected)
//       return ["image/jpeg", "image/png"].includes(value.type);
//     })
//     .test("fileSize", "File size is too large", (value) => {
//       if (!value) return true; // Allow empty value (no file selected)
//       return value.size <= 5 * 1024 * 1024; // 5MB limit (adjust as needed)
//     }),
//   companyname: Yup.string().required("Company name is required"),
//   checkbox: Yup.array().min(1, "Select at least one checkbox"),
// });
// const checkboxOptions = [
//   { value: "Vue JS", label: "Vue JS" },
//   { value: "react", label: "React" },
//   { value: "angular", label: "Angular" },
//   { value: "Laravel", label: "Laravel" },
// ];
// console.log(userData.name);
// const [imagePreview, setimagePreview] = useState(false);
// const initialValues = {
//   name: userData.name || "",
//   email: userData.email || "",
//   about: userData.about || "",
//   profilepicture: "",
//   companyname: userData.companyname || "",
//   checkbox: userData.workingOn || "",
// };
// const onSubmit = async (values) => {
//   console.log(values.checkbox);
//   const formData = new FormData();
//   console.log(imagePreview, "2");
//   formData.append("profilepicture", imagePreview);
//   formData.append("name", values.name);
//   formData.append("email", values.email);
//   formData.append("about", values.about);
//   formData.append("companyname", values.companyname);
//   values.checkbox.forEach((checkboxValue) => {
//     formData.append("checkbox", checkboxValue);
//   });

//   formData.append("userId", id);
//   console.log(formData);
//   const response = await axios.post(
//     "http://localhost:4000/updateprofile",
//     formData
//   );

//   if (response) {
//     if (response.status === 201) {
//       navigate("/profile");
//     } else {
//       console.log("2");
//     }
//   } else {
//     console.log("3");
//   }

//   console.log(response);
// };

{
}
