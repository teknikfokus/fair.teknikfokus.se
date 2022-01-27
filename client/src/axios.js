import axios from "axios";
export const endpoint = "http://localhost:3001/api"

export default axios.create({
  baseURL: endpoint,
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
  }
});