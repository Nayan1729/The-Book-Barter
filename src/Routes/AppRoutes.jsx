import {Route , Routes} from "react-router-dom"
import LoginForm from "../pages/LoginForm";


import React from 'react'
import SignUpForm from "../pages/SignUpForm";
import HomePage from "../pages/HomePage";
import ListBookPage from "../pages/ListBookPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/list-book" element={<ListBookPage />} />
        </Routes>
    )
}

export default AppRoutes