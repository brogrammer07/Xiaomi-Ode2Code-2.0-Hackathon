import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("operator")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("operator")).token
    }`;
  }
  return req;
});

export default API;
