import store from "@/app/redux/store";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL : "http://localhost:3001/"
  baseURL : "https://backend-wsnj.onrender.com/"
});

axiosInstance.interceptors.request.use((config)=>{
  const token = store.getState().auth.token;
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;

});
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;