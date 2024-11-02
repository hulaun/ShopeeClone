import { db } from "../../config/db";
import { ChatRoom, ChatRoomUserRelations, Messages } from "../../../db/schema";
import { ChatRoomModel } from "../models/model";
import { asc, desc, eq, max, sql } from "drizzle-orm";
import { late } from "zod";
import { has, last } from "lodash";

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

      const filteredRooms = db.select({
        roomId: ChatRoom.id,
        roomName: ChatRoom.name,
        lastSeenAt: ChatRoomUserRelations.lastSeenAt,
      })
      .from(ChatRoom)
      .innerJoin(ChatRoomUserRelations, eq(ChatRoom.id, ChatRoomUserRelations.chatRoomId))
      .where(eq(ChatRoomUserRelations.userId, userId))
      .as('filteredRooms');
      
      // Step 2: Join the subquery with `Messages` and use aggregation
      const recentRooms = await db
        .select({
          roomId: filteredRooms.roomId,
          roomName: filteredRooms.roomName,
          lastMessageAt: max(Messages.createdAt),
          lastMessage: Messages.content,
          hasUnreadMessages: sql`MAX(${Messages.createdAt}) > ${filteredRooms.lastSeenAt}`,
        })
        .from(filteredRooms) // Use the subquery as the source
        .innerJoin(Messages, eq(filteredRooms.roomId, Messages.chatRoomId))
        .groupBy(filteredRooms.roomId)
        .orderBy(desc(Messages.createdAt))
        .limit(10);
      return recentRooms;
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