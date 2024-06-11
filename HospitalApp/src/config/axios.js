import axios from "axios";

const token = localStorage.getItem("AUTH TOKEN");
const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `${token}`
  }
});

export default clienteAxios;