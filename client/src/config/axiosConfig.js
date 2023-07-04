import axios from 'axios'


const axiosConfig = axios.create({
    baseURL:import.meta.env.VITE_AXIOS_URL
},
{ withCredentials: true}

);
const adminAxiosConfig = axios.create({
    baseURL:import.meta.env.VITE_AXIOS_ADMIN_URL
},
{ withCredentials: true}

);

export {axiosConfig,adminAxiosConfig};


