import axios from 'axios';

const instance = () => axios.create({
    
    baseURL: process.env.REACT_APP_BACKEND_URL,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'Authorization': `Basic ${ localStorage.getItem("loggedUser")}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

export default instance;