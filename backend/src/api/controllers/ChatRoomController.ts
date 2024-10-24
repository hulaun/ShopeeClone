 import { Request, Response, NextFunction } from "express";
import ChatRoomService from "../services/ChatRoomService";

class ChatRoomController {
  private static instance: ChatRoomController;

  constructor() {
    if (ChatRoomController.instance) {
      return ChatRoomController.instance;
    }
    ChatRoomController.instance = this;
  }

  handleConnection(io: any, socket: any) {
    socket.on("joinRoom", async (chatRoomId: string) => {
      socket.join(chatRoomId);
      const chatRoom = await ChatRoomService.view(chatRoomId);
      io.to(chatRoomId).emit("chatRoom", chatRoom);
    });

    socket.on("leaveRoom", (chatRoomId: string) => {
      socket.leave(chatRoomId);
    });

    socket.on("message", async (message: any) => {
      const chatRoomId = message.chatRoomId;
      io.to(chatRoomId).emit("message", message);
    });
  }

  async viewAll(req: Request, res: Response, next: NextFunction) {
    try {
      const chatRooms = await ChatRoomService.viewAll();
      res.json(chatRooms);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async viewPage(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.params.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const chatRooms = await ChatRoomService.viewPage(page, limit);
      res.json(chatRooms);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async view(req: Request, res: Response, next: NextFunction) {
    try {
      const chatRoomId: string = req.params.id;
      const chatRoom = await ChatRoomService.view(chatRoomId);
      res.json(chatRoom);
    } catch (error) {
      console.error("Error fetching chat room:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
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