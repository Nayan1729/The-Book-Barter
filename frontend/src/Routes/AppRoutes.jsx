import {Route , Routes} from "react-router-dom"
import LoginForm from "../pages/LoginForm";
import React from 'react'
import SignUpForm from "../pages/SignUpForm";
import HomePage from "../pages/HomePage";
import ListBookPage from "../pages/ListBookPage";
import BookDetailsPage from "../pages/BookDetailsPage";
import UserProfile from "../pages/UserProfile";
import TradeDetailsPage from "../pages/TradeDetailsPage";
import ProtectedRoutes from "./ProtectedRoutes";
import LogoutComponent from "../components/LogoutComponent";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={  <LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/" element={<ProtectedRoutes ><HomePage /></ProtectedRoutes> } />
            <Route path="/list-book" element={ <ProtectedRoutes>  <ListBookPage /> </ProtectedRoutes>  } />
            <Route path="/books/:bookId" element={ <ProtectedRoutes>  <BookDetailsPage /> </ProtectedRoutes> } />
            <Route path="/users/:userId" element={ <ProtectedRoutes>  <UserProfile /> </ProtectedRoutes>  } />
            <Route path="/trades/:tradeId" element={<ProtectedRoutes> <TradeDetailsPage /> </ProtectedRoutes> } />
            <Route path="/logout" element={<LogoutComponent />} />
        </Routes>
    )
}

export default AppRoutes