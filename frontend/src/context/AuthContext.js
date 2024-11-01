import React, { useContext, useState, useEffect } from "react";
import { privateHttpRequest } from "../utils/httpRequest";
import config from "../config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    setupInterceptors();
  }, []);

  useEffect(() => {
    if (accessToken) {
      setAuthorizationHeader(accessToken);
    }
  }, [accessToken]);

  const setupInterceptors = () => {
    privateHttpRequest.interceptors.response.use(
      (response) => {
        if (isTokenExpired()) {
          const newAccessToken = response.data.accessToken;
          if (!newAccessToken) {
            window.location.href = config.routes.public.login;
          }
          setAuthorizationHeader(newAccessToken);
          setAccessToken(newAccessToken);
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
  };

  const setAuthorizationHeader = (accessToken) => {
    if (accessToken) {
      privateHttpRequest.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    } else {
      delete privateHttpRequest.defaults.headers.common["Authorization"];
    }
  };

  const isTokenExpired = () => {
    const authorizationHeader =
      privateHttpRequest.defaults.headers.common["Authorization"];
    if (!authorizationHeader) {
      console.log("Authorization header is missing");
      return true;
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      console.log("Token is missing in the Authorization header");
      return true;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp < currentTime;
  };

  const isConsumer = () => {
    return currentUser?.role === "Consumer";
  };

  const isAdmin = () => {
    return currentUser?.role === "Admin";
  };

  const isVendor = () => {
    return currentUser?.role === "Vendor";
  };

  const value = {
    currentUser,
    setCurrentUser,
    accessToken,
    setAccessToken,
    isConsumer,
    isAdmin,
    isVendor,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
