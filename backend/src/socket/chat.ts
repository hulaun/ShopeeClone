import { Namespace, Server, Socket } from "socket.io";
import ChatRoomService from "../api/services/ChatRoomService";
import { verifyAccessToken } from "../api/utils/AuthUtils";

export const handleConnection = (io: Namespace, socket: Socket) => {
  socket.use((packet: any, next: (err?: Error | undefined) => void) => {
    const token = socket.handshake.auth.token;
    if (!token){
      console.log("No token provided");
      socket.emit("unauthorized", "No token provided");
    }
    const user = verifyAccessToken(token);
    if (!user){
      console.log("Invalid token");
      socket.emit("unauthorized", "Invalid token");
    }
    socket.data.user = user;
    next();
  });

  socket.on("joinRoom", async (chatRoomId: string) => {
    console.log("User joined room:", chatRoomId);
    socket.join(chatRoomId);
    // const chatRoom = await ChatRoomService.view(chatRoomId);
    // io.to(chatRoomId).emit("chatRoom", chatRoom);
  });
  
  socket.on("switchRoom", async (previousRoomId: string, newRoomId: string) => {
    console.log("User left room:", previousRoomId);
    socket.leave(previousRoomId);
    console.log("User joined room:", newRoomId);
    socket.join(newRoomId);
    // const chatRoom = await ChatRoomService.view(newRoomId);
    // io.to(newRoomId).emit("chatRoom", chatRoom);
  });

  socket.on("joinRoomFirstTime", async (chatRoomId: string) => {
    console.log("User joined room first time:", chatRoomId);
    socket.join(chatRoomId);
    // const chatRoom = await ChatRoomService.view(chatRoomId);
    // io.to(chatRoomId).emit("chatRoom", chatRoom);
  });

  socket.on("leaveRoom", (chatRoomId: string) => {
    console.log("User left room:", chatRoomId);
    socket.leave(chatRoomId);
  });
  
  socket.on("deleteRoom", (chatRoomId: string) => {
    console.log("User left room:", chatRoomId);
    socket.leave(chatRoomId);
    const chatRoom = ChatRoomService.delete(chatRoomId);
  });

  socket.on("sendMessage", async (message: any, chatRoomId: string) => {
    console.log("Message received:", message, chatRoomId);
    const newMessage = await ChatRoomService.addMessage(chatRoomId, message, socket.data.user);
    io.to(chatRoomId).emit("updateMessageState", {
      newMessage
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
}