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

  const value = {
    setAuthorizationHeader,
    currentUser,
    setCurrentUser,
    accessToken,
    setAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
