import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
  withCredentials: true,
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const post = async (path, options = {}) => {
  const response = await httpRequest.post(path, options);
  return response.data;
};

export default httpRequest;
