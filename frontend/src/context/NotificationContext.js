import React, { useContext, useState } from "react";

const NotificationContext = React.createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const localSocket = io("/local");

  localSocket.on("connect", () => {
    console.log("Connected to /local namespace");
    localSocket.emit("localMessage", "Hello from local namespace!");
  });

  localSocket.on("localResponse", (response) => {
    console.log(response);
  });

  const value = {};

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
