import axios from "axios";
import config from "../config";

const publicHttpRequest = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
  withCredentials: true,
});

export const privateHttpRequest = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
  withCredentials: true,
});

privateHttpRequest.interceptors.response.use(
  (response) => {
    // if(privateHttpRequest.defaults.headers.common["Authorization"])
    if (response.data.data.accessToken) {
      privateHttpRequest.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.data.accessToken}`;
    }
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      window.location.href = config.routes.public.login;
    }
    return Promise.reject(error);
  }
);
export const publicGet = async (path, options = {}) => {
  return await publicHttpRequest.get(path, options);
};

export const publicPost = async (path, options = {}) => {
  return await publicHttpRequest.post(path, options);
};

export const privateGet = async (path, options = {}) => {
  return await privateHttpRequest.get(path, options);
};

export const privatePost = async (path, options = {}) => {
  return await privateHttpRequest.post(path, options);
};
