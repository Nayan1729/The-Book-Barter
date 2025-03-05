import  React from "react"
import { useState } from "react"
import {Button , Input , Label, Loader} from "../../index"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../Card"
import { Eye, EyeOff, BookOpen, Check, X } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useFormik } from "formik"
import SignUpFormSchema from "../schemas/SignUpFormSchema"

export default function SignupPage() {


  const formik = useFormik({
    initialValues: {
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        avatar: "",
    },
    validationSchema : SignUpFormSchema,
    onSubmit :(values)=>{
        console.log(values);
    }
    })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAvatarChange = (e)=>{
    const file = e.currentTarget.files[0];
    if(file){
        formik.setFieldValue("avatar",file)
        console.log(URL.createObjectURL(file));
        
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <motion.div className="flex items-center justify-center text-amber-900" whileHover={{ scale: 1.05 }}>
              <BookOpen className="h-8 w-8 mr-2" />
              <h1 className="text-3xl font-serif font-bold">The Book Barter</h1>
            </motion.div>
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1 bg-amber-800 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-serif text-center">Create an Account</CardTitle>
            <CardDescription className="text-amber-100 text-center">Join our community of book lovers</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    {...formik.getFieldProps("name")}
                    error={formik.errors.name}
                    touched={formik.touched.name}
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+91 (555) 123-4567"
                    {...formik.getFieldProps("phoneNumber")}
                    error={formik.errors.phoneNumber}
                    touched={formik.touched.phoneNumber}
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="border-2 border-dashed border-amber-200 rounded-lg p-4 text-center hover:bg-amber-50 transition-colors cursor-pointer">
                    <Input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/*"
                      className="hidden"
                      onChange = {handleAvatarChange}
                    />
                    <label htmlFor="avatar" className="cursor-pointer block">
                      {formik.values.avatar ? (
                        <div className="flex flex-col items-center">
                          <div className="w-24 h-24 rounded-full overflow-hidden mb-2 mx-auto">
                            <img
                              src={URL.createObjectURL(formik.values.avatar) || "/placeholder.svg"}
                              alt="Avatar preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-amber-700">Click to change</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-amber-700">
                          <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mb-2 mx-auto">
                            <svg
                              className="h-10 w-10 text-amber-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <span>Upload profile picture</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...formik.getFieldProps("email")}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...formik.getFieldProps("password")}
                      error={formik.errors.password}
                      touched={formik.touched.password}
                      className="border-amber-200 focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                 
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...formik.getFieldProps("confirmPassword")}
                      error={formik.errors.confirmPassword}
                      touched={formik.touched.confirmPassword}
                      className={`border-amber-200 focus:border-amber-500`}
                    />
                  </div>
                  
                </div>

                <Button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-white" disabled={loading}>
                  {loading ? (
                    <Loader />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-amber-100 pt-4">
            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-amber-800 hover:text-amber-600 font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}