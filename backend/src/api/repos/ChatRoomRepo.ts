import { db } from "../../config/db";
import { ChatRoom, ChatRoomUserRelations, Messages, User } from "../../../db/schema";
import { ChatRoomModel, UserModel } from "../models/model";
import { asc, desc, eq, max, sql } from "drizzle-orm";

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
      .limit(10)
      .as('filteredRooms');
      
      const recentRooms = await db
        .select({
          roomId: filteredRooms.roomId,
          roomName: sql`CASE WHEN ${filteredRooms.roomName} = '1on1' THEN (
            SELECT username 
            FROM ${ChatRoomUserRelations}
            INNER JOIN ${User} ON ${User}.id = ${ChatRoomUserRelations}.userId
            WHERE ${ChatRoomUserRelations}.chatRoomId = ${filteredRooms.roomId}
            AND ${ChatRoomUserRelations}.userId != ${userId}
            LIMIT 1
          ) ELSE ${filteredRooms.roomName} END`,
          senderIcon: User.profilePicture,
          lastMessageAt: max(Messages.createdAt),
          lastMessage: Messages.content,
          hasUnreadMessages: sql`MAX(${Messages.createdAt}) > ${filteredRooms.lastSeenAt}`,
        })
        .from(filteredRooms) 
        .innerJoin(Messages, eq(filteredRooms.roomId, Messages.chatRoomId))
        .innerJoin(User, eq(User.id, Messages.senderId))
        .groupBy(filteredRooms.roomId)
        .orderBy(desc(Messages.createdAt))
        .limit(10);
      return recentRooms;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findTheParticipants(chatRoomId: string) {
    try {
      const participants = await db
        .select({
          userId: ChatRoomUserRelations.userId,
          username: User.username,
          profilePicture: User.profilePicture,
        })
        .from(ChatRoomUserRelations)
        .innerJoin(User, eq(User.id, ChatRoomUserRelations.userId))
        .where(eq(ChatRoomUserRelations.chatRoomId, chatRoomId));
      return participants;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findSome(userId: string, page: number, limit: number) {
    try {
      const filteredRooms = db.select({
        roomId: ChatRoom.id,
        roomName: ChatRoom.name,
        lastSeenAt: ChatRoomUserRelations.lastSeenAt,
      })
      .from(ChatRoom)
      .innerJoin(ChatRoomUserRelations, eq(ChatRoom.id, ChatRoomUserRelations.chatRoomId))
      .where(eq(ChatRoomUserRelations.userId, userId))
      .limit(10)
      .as('filteredRooms');
      
      const recentRooms = await db
        .select({
          roomId: filteredRooms.roomId,
          roomName: sql`CASE WHEN ${filteredRooms.roomName} = '1on1' THEN (
            SELECT username 
            FROM ${ChatRoomUserRelations}
            INNER JOIN ${User} ON ${User}.id = ${ChatRoomUserRelations}.userId
            WHERE ${ChatRoomUserRelations}.chatRoomId = ${filteredRooms.roomId}
            AND ${ChatRoomUserRelations}.userId != ${userId}
            LIMIT 1
          ) ELSE ${filteredRooms.roomName} END`,
          senderIcon: User.profilePicture,
          lastMessageAt: max(Messages.createdAt),
          lastMessage: Messages.content,
          hasUnreadMessages: sql`MAX(${Messages.createdAt}) > ${filteredRooms.lastSeenAt}`,
        })
        .from(filteredRooms) 
        .innerJoin(Messages, eq(filteredRooms.roomId, Messages.chatRoomId))
        .innerJoin(User, eq(User.id, Messages.senderId))
        .groupBy(filteredRooms.roomId)
        .orderBy(desc(Messages.createdAt))
        .limit(10);
      return recentRooms;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findMessagesById(chatRoomId: string) {
    try {
      const chatRoom = await db
        .select({
          message: Messages.content,
          senderId: Messages.senderId,
          senderName: User.username,
          createdAt: Messages.createdAt,
          senderIcon: User.profilePicture,
        })
        .from(ChatRoom)
        .innerJoin(Messages, eq(Messages.chatRoomId, ChatRoom.id))
        .innerJoin(User, eq(User.id, Messages.senderId))
        .where(eq(ChatRoom.id, chatRoomId))
        .orderBy(desc(Messages.createdAt))
        .limit(20);
      return chatRoom;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  
  async findMostRecentlyVisited(userId: string) {
    try {
      const chatRoom = await db
        .select({
          id: ChatRoomUserRelations.chatRoomId,
        })
        .from(ChatRoomUserRelations)
        .innerJoin(ChatRoom, eq(ChatRoom.id, ChatRoomUserRelations.chatRoomId))
        .where(eq(ChatRoomUserRelations.userId, userId))
        .orderBy(desc(ChatRoomUserRelations.lastSeenAt))
        .limit(1) as { id: string }[];
      return chatRoom[0].id;
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