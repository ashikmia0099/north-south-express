import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://north-south-express-render.onrender.com',
   
  });

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;