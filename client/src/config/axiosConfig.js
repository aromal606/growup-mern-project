import axios from 'axios'

const axiosConfig = axios.create({
    baseURL:"http://localhost:4000",
},
{ withCredentials: true}

);
const adminAxiosConfig = axios.create({
    baseURL:"http://localhost:4000/admin",
},
{ withCredentials: true}

);

export {axiosConfig,adminAxiosConfig};


