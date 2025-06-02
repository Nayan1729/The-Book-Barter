import * as Yup from "yup";

const SignUpFormSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name can't be more than 50 characters")
    .required("Full Name is required"),
  
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  
    phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  
  avatar: Yup.mixed()
    .nullable()
});

export default SignUpFormSchema;
