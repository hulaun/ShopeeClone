import React, { useContext, useState, useEffect } from "react";
import { privateHttpRequest } from "../utils/httpRequest";
import config from "../config";
import Cookies from "js-cookie";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    setupInterceptors();
    refreshNecessaryData();
  }, []);

  useEffect(() => {
    setAuthorizationHeader(accessToken);
  }, [accessToken]);

  const setupInterceptors = () => {
    privateHttpRequest.interceptors.response.use(
      (response) => {
        if (isTokenExpired()) {
          const newAccessToken = response.data.accessToken;
          if (!newAccessToken) {
            window.location.href = config.routes.public.login;
          }
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

  const handleGoogleAuth = () => {
    const accessToken = Cookies.get("accessToken");
    const user = Cookies.get("user");
    if (!accessToken || !user) return;
    sessionStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);
    setAuthorizationHeader(accessToken);
    setCurrentUser(JSON.parse(user.substring(2, user.length)));
  };

  const logout = () => {
    setAccessToken(null);
    setCurrentUser(null);
    sessionStorage.removeItem("accessToken");
    setAuthorizationHeader("");
  };

  const isTokenExpired = () => {
    const authorizationHeader =
      privateHttpRequest.defaults.headers.common["Authorization"];
    if (!authorizationHeader) {
      return true;
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return true;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp < currentTime;
  };

  const isConsumer = () => {
    if (!currentUser) {
      const data = decodeJWT();
      setAuthorizationHeader(sessionStorage.getItem("accessToken"));
      return data?.role === "Consumer";
    }
    return currentUser?.role === "Consumer";
  };

  const isAdmin = () => {
    if (!currentUser) {
      const data = decodeJWT();
      setAuthorizationHeader(sessionStorage.getItem("accessToken"));
      return data?.role === "Admin";
    }
    return currentUser?.role === "Admin";
  };

  const isVendor = () => {
    if (!currentUser) {
      const data = decodeJWT();
      setAuthorizationHeader(sessionStorage.getItem("accessToken"));
      return data?.role === "Vendor";
    }
    return currentUser?.role === "Vendor";
  };

  const refreshNecessaryData = () => {
    if (!currentUser) {
      const data = decodeJWT();
      if (!data) return;
      setCurrentUser({
        id: data.id,
        username: data.username,
        role: data.role,
        email: data.email,
      });
    }
  };

  const decodeJWT = () => {
    const token =
      accessToken || sessionStorage.getItem("accessToken") || undefined;
    if (!token) {
      return;
    }
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    return JSON.parse(payloadJson);
  };

  const value = {
    currentUser,
    setCurrentUser,
    accessToken,
    setAccessToken,
    handleGoogleAuth,
    isConsumer,
    isAdmin,
    isVendor,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
