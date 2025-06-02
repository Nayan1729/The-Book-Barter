import axios from "axios";

const portNumber = 8081

const BASE_URL = `http://localhost:${portNumber}/api/v1`
const authToken = localStorage.getItem("authToken")

export const myAxios = axios.create({
    baseURL : BASE_URL,
    withCredentials: true
})
if (authToken) {
    myAxios.defaults.headers.common["Authorization"] = authToken;
}