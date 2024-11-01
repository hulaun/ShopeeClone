import axios from "axios";

const publicHttpRequest = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
  withCredentials: true,
});

export const privateHttpRequest = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
  withCredentials: true,
});

//interceptor

axios.interceptors.response.use((req) => {
  console.log(`${req.method} ${req.url}`);
  return req;
});

//http methods

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
