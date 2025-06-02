import React, {useState , useEffect } from 'react'
import { isAuthenticatedApi } from '../apiEndPoints'
import { Loader } from '../components'
import LogoutComponent from '../components/LogoutComponent'
import { useNavigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const navigate = useNavigate()
    useEffect(()=>{
        const isUserAuthenticated = async()=>{
            const res = await isAuthenticatedApi();
            if(res.statusCode == 200){
                setIsAuthenticated(true)
            }else{
                setIsAuthenticated(false);
                navigate("/login")
            }
        }
        isUserAuthenticated();
    },[])

    if(isAuthenticated == null){
        return <Loader />
    }
    if(isAuthenticated == false){
        return <LogoutComponent />
    }
    return (
   <> 
       {children}
   </>
  )
}

export default ProtectedRoutes