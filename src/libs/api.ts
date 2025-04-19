import axios from "axios";
import AxiosHelper from "@/helpers/axios-helper";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

AxiosHelper.addTokenToAxiosInstance(api);

export default api;
