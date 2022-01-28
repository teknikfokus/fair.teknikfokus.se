import axios from "axios";
export const endpoint = "http://localhost:3001/api"

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
})