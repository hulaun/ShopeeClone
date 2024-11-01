import { ChatRoomModel, UserModel } from "../models/model";
import ChatRoomRepo from "../repos/ChatRoomRepo";

class ChatRoomService {
  private static instance: ChatRoomService;

  constructor() {
    if (ChatRoomService.instance) {
      return ChatRoomService.instance;
    }
    ChatRoomService.instance = this;
  }

  async create(newChatRoom: ChatRoomModel) {
    try {
      const chatRoom = await ChatRoomRepo.create(newChatRoom);
      return chatRoom;
    } catch (error) {
      console.error("Error creating chat room:", error);
      throw new Error("Internal server error");
    }
  }

  async viewAll(user: UserModel) {
    try {
      const chatRooms = await ChatRoomRepo.findAll(user.id);
      return chatRooms;
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
      throw new Error("Internal server error");
    }
  }

  async viewPage(user: UserModel, page: number, limit: number) {
    try {
      const chatRooms = await ChatRoomRepo.findSome(user.id, page, limit);
      return chatRooms;
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
      throw new Error("Internal server error");
    }
  }

  async view(user: UserModel, chatRoomId: string) {
    try {
      const chatRoom = await ChatRoomRepo.findById(user.id, chatRoomId);
      return chatRoom;
    } catch (error) {
      console.error("Error fetching chat room:", error);
      throw new Error("Internal server error");
    }
  }

  async update(chatRoomId: string, updateData: ChatRoomModel) {
    try {
      const chatRoom = await ChatRoomRepo.update(chatRoomId, updateData);
      return chatRoom;
    } catch (error) {
      console.error("Error updating chat room:", error);
      throw new Error("Internal server error");
    }
  }

  async delete(chatRoomId: string) {
    try {
      await ChatRoomRepo.delete(chatRoomId);
    } catch (error) {
      console.error("Error deleting chat room:", error);
      throw new Error("Internal server error");
    }
  }
}

const instance = new ChatRoomService();
Object.freeze(instance);

export default instance;