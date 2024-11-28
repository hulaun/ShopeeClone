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

export const publicGet = async ({ path, data, options = {}, signal }) => {
  return await publicHttpRequest.get(path, data, { ...options, signal });
};

export const publicPost = async ({ path, data, options = {}, signal }) => {
  return await publicHttpRequest.post(path, data, { ...options, signal });
};

export const privateGet = async ({ path, data, options = {}, signal }) => {
  return await privateHttpRequest.get(path, data, { ...options, signal });
};

export const privatePost = async ({
  path,
  data,
  options = {},
  signal,
  headers,
}) => {
  console.log("headers", headers);
  return await privateHttpRequest.post(path, data, {
    ...options,
    signal,
    headers,
  });
};

export const privatePatch = async ({
  path,
  data,
  options = {},
  signal,
  headers,
}) => {
  return await privateHttpRequest.patch(path, data, {
    ...options,
    signal,
    headers,
  });
};
