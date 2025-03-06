import {Route , Routes} from "react-router-dom"
import LoginForm from "../pages/LoginForm";


import React from 'react'
import SignUpForm from "../pages/SignUpForm";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />

        </Routes>
    )
}

export default AppRoutes