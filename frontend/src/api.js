import axios from "axios";

const axiosConfig = {
     baseURL: "http://localhost:3333",
};

export const API = axios.create(axiosConfig);