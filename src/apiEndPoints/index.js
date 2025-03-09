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
            console.log(res);
            return res.data;
        }
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

export const findNearByBooksApi = async(values)=>{
    try {
        const params = new URLSearchParams();
        if (values.lat !== undefined && values.lat !== null) {
            params.append('latitude', values.lat);
        }
        if (values.lng !== undefined && values.lng !== null) {
            params.append('longitude', values.lng);
        }
        if (values.filterType !== undefined && values.filterType !== null) {
            params.append('filterType', values.filterType);
        }
        if (values.filterQuery !== undefined && values.filterQuery !== null) {
            params.append('filterQuery', values.filterQuery);
        }
        if (values.location !== undefined && values.location !== null) {
            params.append('location', values.location);
        }
        if (values.radius !== undefined && values.radius !== null) {
            params.append('radius', values.radius.toString());
        }
        if (values.pageNo !== undefined && values.pageNo !== null) {
            params.append('pageNo', values.pageNo.toString());
        }
        if (values.pageSize !== undefined && values.pageSize !== null) {
            params.append('pageSize', values.pageSize.toString());
        }
        if (values.sortBy !== undefined && values.sortBy !== null) {
            params.append('sortBy', values.sortBy);
        }
        if (values.sortDir !== undefined && values.sortDir !== null) {
            params.append('sortDir', values.sortDir);
        }

        const query = params.toString();
        console.log("get books Api: ", values);
        const res = await myAxios.get('/books?' + query);
        console.log(res);
        return res.data;
    } catch (error) {
        return error.response?.data;
    }
};

export const getBookDetailsApi = async(id)=>{
    try {
        const res = await myAxios.get(`/books/${parseInt(id)}`)
        console.log(res.data);
        
        return res.data        
    } catch (error) {
        return error.response.data
    }
}