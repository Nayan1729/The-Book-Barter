import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutComponent = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        localStorage.removeItem("authToken")
        localStorage.removeItem("email")
        localStorage.removeItem("userId")
        localStorage.removeItem("userRole")
        navigate("/login")
    },[])
}

export default LogoutComponent
