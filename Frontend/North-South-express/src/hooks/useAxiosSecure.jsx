import axios from "axios";




const axiosSecure = axios.create({
    baseURL: 'https://north-south-express-render.onrender.com'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;