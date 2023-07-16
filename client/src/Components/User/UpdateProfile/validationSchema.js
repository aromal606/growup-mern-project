import * as Yup from "yup";
const phoneRegExp = /^[0-9]{10}$/;
const basicSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    phone: Yup.string().matches(phoneRegExp, "not a valid number").required("Phone number is required"),
    profilepicture: Yup.mixed().test(
      "fileFormat",
      "Invalid file format",
      function (value) {
        if (value && value.length > 0 && value[0].type) {
          const supportedFormats = ["jpg", "jpeg", "png"];
          const extension = value[0].type.split("/")[1];
          return supportedFormats.includes(extension);
        }
        return true;
      }
    )
    ,
    about: Yup.string().required("About is required"),
    checked: Yup.array().min(1, "Please select at least one checkbox"),

})
export default basicSchema