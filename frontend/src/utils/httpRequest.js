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

export const publicGet = async (path, options = {}, signal) => {
  return await publicHttpRequest.get(path, { ...options, signal });
};

export const publicPost = async (path, options = {}, signal) => {
  return await publicHttpRequest.post(path, { ...options, signal });
};

export const privateGet = async (path, options = {}, signal) => {
  return await privateHttpRequest.get(path, { ...options, signal });
};

export const privatePost = async (path, options = {}, signal, headers = {}) => {
  return await privateHttpRequest.post(
    path,
    { ...options, signal },
    { headers: { ...headers } }
  );
};

export const privatePatch = async (path, options = {}, signal) => {
  return await privateHttpRequest.patch(path, { ...options, signal });
};
