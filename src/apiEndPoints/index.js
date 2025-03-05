import { myAxios } from "../utils/userServices";
export const loginApi = async(values)=>{
    try {
        console.log("loginApi:",values);
        const res = await myAxios.post('/auth/login',values);
        const token = res.headers['authorization'];
        if(res.data.statusCode==200 && token){
            localStorage.setItem("authToken",token)
            localStorage.setItem("email",values.email)
            localStorage.setItem("userId",res.data.data.id)
            localStorage.setItem("userRole",res.data.data.role)
            console.log(res.data);
            console.log(token);
            myAxios.defaults.headers.common['authorization'] = token;
        }
        console.log(res);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const signUpApi = async(values)=>{
    try {
        console.log("signUpApi:",values);
        const formData = new FormData();
        Object.keys(values).forEach((key)=>{
            console.log(key, ":", values[key]);
            formData.append(key , values[key])
        })
        const res = await myAxios.post('/auth/register',formData);
        const token = res.headers['authorization'];
        if(res.data.statusCode==201 && token){
            console.log("res.data.data.id"+res.data.data.id);
            console.log("res.data.data: "+res.data.data);
            localStorage.setItem("authToken",token)
            localStorage.setItem("email",values.email)
            localStorage.setItem("userId",res.data.data.id)
            localStorage.setItem("userRole",res.data.data.role)
            console.log(res.data);
            console.log(token);
            myAxios.defaults.headers.common['authorization'] = token;
        }
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
        
        return error.response?.data;
    }
}