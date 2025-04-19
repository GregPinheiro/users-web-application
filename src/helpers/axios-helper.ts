import { AxiosInstance } from "axios";

class AxiosHelper {
  private token: string | null = null;

  addTokenToAxiosInstance(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }

      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          window.location.href = "/";
        }

        return Promise.reject(error);
      }
    );
  }

  setToken(token: string | null) {
    this.token = token;
  }
}

export default new AxiosHelper();
