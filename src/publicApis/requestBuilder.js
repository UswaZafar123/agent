import axios from "axios";

const axiosInstance = axios.create({
  baseURL: window.env.api.tradeUrl,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
    return console.log(error);
  }
);

export default axiosInstance;
