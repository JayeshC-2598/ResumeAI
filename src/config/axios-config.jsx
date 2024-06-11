import axios from 'axios';

const http = axios.create({
    baseURL:`${import.meta.env.VITE_apiUrl}/api/v1/`
});
const securehttp = axios.create({
    baseURL:`${import.meta.env.VITE_apiUrl}/api/v1/`
});

export default http;
export {http, securehttp};