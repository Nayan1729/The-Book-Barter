import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import {useFormik} from "formik"
import {Button , Label , Input} from "../../index"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../Card";
import LoginFormValidationSchema from "../schemas/LoginFormValidationSchema";
import { toast } from "react-toastify";

export default function LoginFormComponent() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues : {
      email : "",
      password : "",
      showPassword : null,
    },
    validationSchema : LoginFormValidationSchema,
    onSubmit : (values) => {
      console.log(values)
    }
  })
 
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <motion.div className="flex items-center justify-center text-amber-900" whileHover={{ scale: 1.05 }}>
              <BookOpen className="h-8 w-8 mr-2" />
              <h1 className="text-3xl font-serif font-bold">The Book Barter</h1>
            </motion.div>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl">
          <CardHeader className="space-y-1 bg-amber-800 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-serif text-center">Welcome Back</CardTitle>
            <CardDescription className="text-amber-100 text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...formik.getFieldProps("email")}
                    error = {formik.errors.email}
                    touched={formik.touched.email}
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={formik.values.showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...formik.getFieldProps("password")}
                      error = {formik.errors.password}
                      touched={formik.touched.password}
                      onChange={formik.handleChange}
                      className="border-amber-200 focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => formik.setFieldValue("showPassword",!formik.values.showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {!formik.values.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                

                {/* Sign In Button */}
                <Button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-white" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 border-t border-amber-100 pt-4">
            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-amber-800 hover:text-amber-600 font-medium">
                Sign up
              </Link>
            </div>

            {/* Divider */}
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">OR CONTINUE WITH</span>
              </div>
            </div> */}

            {/* Social Login Buttons */}
            {/* <SocialLoginButtons /> */}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
