import axios from "axios";

const axiosConfig = {
     baseURL: "http://localhost:3333",
};

const apiCompanies = {
     baseURL: "https://www.receitaws.com.br/v1/cnpj"
}

export const API = axios.create(axiosConfig);
export const Company = axios.create(apiCompanies);
