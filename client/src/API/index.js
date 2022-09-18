import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
});

API.interceptors.request.use((req) => {
  if (sessionStorage.getItem("operator")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(sessionStorage.getItem("operator")).token
    }`;
  }
  return req;
});

export default API;
