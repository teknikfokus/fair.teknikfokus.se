import axios from "axios";
import router from "./routes";
export const endpoint = window.location.hostname === 'localhost' ? "http://localhost:3001/api" : "https://fair.teknikfokus.se/api";

export const http = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-type": "application/json",
  }
});

http.interceptors.request.use((config) => {
  let token = localStorage.getItem('token');
  if(token){
    config.headers.Authorization = "Bearer " + token;
  }
  return config
}, (err) => {
  console.log(err)
  return Promise.reject(err)
});

http.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status === 401) {
    return localStorage.getItem('company_slug') || window.location.pathname.includes("/dashboard")
     ? router.push("/dashboard")
     : router.push("/");
  }
  return Promise.reject(error);
});