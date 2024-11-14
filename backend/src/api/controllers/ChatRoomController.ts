 import { Request, Response, NextFunction } from "express";
import ChatRoomService from "../services/ChatRoomService";
import { verifyAccessToken } from "../utils/AuthUtils";
class ChatRoomController {
  private static instance: ChatRoomController;

  constructor() {
    if (ChatRoomController.instance) {
      return ChatRoomController.instance;
    }
    ChatRoomController.instance = this;
  }

  handleConnection(io: any, socket: any) {
    socket.use((packet: any, next: NextFunction) => {
      const token = socket.handshake.auth.token;
      if (token) {
        try {
          const user = verifyAccessToken(token);
          socket.data.user = user;
          next();
        } catch (err) {
          socket.emit("unauthorized", "Invalid token");
        }
      } else {
        socket.emit("unauthorized", "No token provided");
      }
    });

    socket.on("joinRoom", async (chatRoomId: string) => {
      console.log("User joined room:", chatRoomId);
      socket.join(chatRoomId);
      const chatRoom = await ChatRoomService.view(chatRoomId);
      io.to(chatRoomId).emit("chatRoom", chatRoomId);
    });

    socket.on("joinRoomFirstTime", async (chatRoomId: string) => {
      console.log("User joined room first time:", chatRoomId);
      socket.join(chatRoomId);
      const chatRoom = await ChatRoomService.view(chatRoomId);
      io.to(chatRoomId).emit("chatRoom", chatRoom);
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
      console.log(socket.data.user)
      const newMessage = await ChatRoomService.addMessage(chatRoomId, message, socket.data.user);
      io.to(chatRoomId).emit("updateMessageState", {
        newMessage
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  }

  async viewAll(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const chatRooms = await ChatRoomService.viewAll(res.locals.user);
      res.json({
        data:chatRooms,
        message:"Rooms fetched successfully",
        accessToken
      });
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async viewPage(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const page = parseInt(req.params.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const chatRooms = await ChatRoomService.viewPage(res.locals.user, page, limit);
      res.json({
        data:chatRooms,
        message:"Rooms fetched successfully",
        accessToken
      });
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async view(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const chatRoomId: string = req.params.id;
      const messages = await ChatRoomService.view(chatRoomId);
      res.json({
        data:{
          messages: messages
        },
        message:"Room fetched successfully",
        accessToken
      });
    } catch (error) {
      console.error("Error fetching chat room:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async viewMostRecentlyVisited(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const data = await ChatRoomService.viewMostRecentlyVisited(res.locals.user.id);
      res.json({
        data:{
          roomId: data.roomId,
          messages: data.messages
        },
        message:"Room fetched successfully",
        accessToken
      });
    } catch (error) {
      console.error("Error fetching chat room:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const newChatRoom = req.body;
      const chatRoom = await ChatRoomService.create(newChatRoom);
      res.status(201).json(chatRoom);
    } catch (error) {
      console.error("Error creating chat room:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const chatRoomId: string = req.params.id;
      const updateData = req.body;
      const chatRoom = await ChatRoomService.update(chatRoomId, updateData);
      res.status(200).json(chatRoom);
    } catch (error) {
      console.error("Error updating chat room:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = res.locals.token;
      const chatRoomId: string = req.params.id;
      await ChatRoomService.delete(chatRoomId);
      res.status(200).json({ message: "Chat room deleted successfully" });
    } catch (error) {
      console.error("Error deleting chat room:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

const instance = new ChatRoomController();
Object.freeze(instance);

export default instance;