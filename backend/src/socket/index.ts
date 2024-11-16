import { Server } from "socket.io";
import { handleConnection } from "./chat";

export const runSockets = (io: Server) => {
    const chatNamespace = io.of("/chat");
    chatNamespace.on("connection", (socket) => {
      console.log("a user connected");
      handleConnection(chatNamespace, socket);
    });
}