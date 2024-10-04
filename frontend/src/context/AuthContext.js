import React, { useContext, useState } from "react";
import httpRequest from "../utils/httpRequest";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [accessToken, setAccessToken] = useState();

  const setAuthorizationHeader = (accessToken) => {
    if (accessToken) {
      httpRequest.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    } else {
      delete httpRequest.defaults.headers.common["Authorization"];
    }
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
    setAuthorizationHeader,
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
