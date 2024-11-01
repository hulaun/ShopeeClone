import { db } from "../../config/db";
import { ChatRoom, ChatRoomUserRelations } from "../../../db/schema";
import { ChatRoomModel } from "../models/model";
import { eq } from "drizzle-orm";

class ChatRoomRepo {
  private static instance: ChatRoomRepo;

  constructor() {
    if (ChatRoomRepo.instance) {
      return ChatRoomRepo.instance;
    }
    ChatRoomRepo.instance = this;
  }

  async findAll(userId: string) {
    try {
      const chatRooms = await db.select({
        id: ChatRoom.id,
        name: ChatRoom.name,
        createdAt: ChatRoom.createdAt,
        type: ChatRoom.type,
      }).from(ChatRoomUserRelations).innerJoin(ChatRoom, eq(ChatRoom.id, ChatRoomUserRelations.chatRoomId));
      return chatRooms;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findSome(userId: string, page: number, limit: number) {
    try {
      const chatRooms = await db.select({
        id: ChatRoom.id,
        name: ChatRoom.name,
        createdAt: ChatRoom.createdAt,
        type: ChatRoom.type,
      }).from(ChatRoom)
        .limit(limit)
        .offset((page - 1) * limit);
      return chatRooms;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findById(userId: string, chatRoomId: string) {
    try {
      const chatRoom = await db.select().from(ChatRoom).where(eq(ChatRoom.id, chatRoomId));
      return chatRoom;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async create(newChatRoom: ChatRoomModel) {
    try {
      const chatRoom = await db
        .insert(ChatRoom)
        .values({
          ...newChatRoom
        })
        .returning({ insertedId: ChatRoom.id, name: ChatRoom.name });
      return chatRoom;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async delete(chatRoomId: string) {
    try {
      const chatRoom = await db
        .delete(ChatRoom)
        .where(eq(ChatRoom.id, chatRoomId))
        .returning({ id: ChatRoom.id, name: ChatRoom.name });
      return chatRoom;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(chatRoomId: string, updatedColumns: ChatRoomModel) {
    try {
      const chatRoom = await db
        .update(ChatRoom)
        .set({ ...updatedColumns })
        .where(eq(ChatRoom.id, chatRoomId))
        .returning();
      return chatRoom;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

const instance = new ChatRoomRepo();
Object.freeze(instance);

export default instance;