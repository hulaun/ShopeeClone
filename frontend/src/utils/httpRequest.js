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

publicHttpRequest.interceptors.request.use((req) => {
  console.log(`publicHttpRequest ${req.method} ${req.url}`);
  return req;
});
publicHttpRequest.interceptors.response.use((res) => {
  console.log(`publicHttpRequest response`);
  console.log(res);
  return res;
});

privateHttpRequest.interceptors.request.use((req) => {
  console.log(`privateHttpRequest ${req.method} ${req.url}`);
  return req;
});
privateHttpRequest.interceptors.response.use((res) => {
  console.log("privateHttpRequest response");
  console.log(res);
  return res;
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
