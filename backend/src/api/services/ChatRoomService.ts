import { ChatRoomModel, MessagesModel, UserModel } from "../models/model";
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

  async view(chatRoomId: string) {
    try {
      const chatRoom = await ChatRoomRepo.findMessagesById(chatRoomId);
      return chatRoom;
    } catch (error) {
      console.error("Error fetching chat room:", error);
      throw new Error("Internal server error");
    }
  }
  
  async viewMostRecentlyVisited(userId: string) {
    try {
      const chatRoomId: string = await ChatRoomRepo.findMostRecentlyVisited(userId) as string;
      const messages = await ChatRoomRepo.findMessagesById(chatRoomId);
      return {
        roomId: chatRoomId,
        messages: messages || [],
      };
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

  async addMessage(chatRoomId: string, message: string, sender: UserModel) {
    try {
      const newMessage: MessagesModel = await ChatRoomRepo.addMessage(chatRoomId, message, sender.id) as MessagesModel;
      return {
        ...newMessage,
        senderName: sender.username,
        senderIcon: sender.profilePicture,
      }
    } catch (error) {
      console.error("Error adding message to chat room:", error);
      throw new Error("Internal server error");
    }
  }
}

const instance = new ChatRoomService();
Object.freeze(instance);

export default instance;