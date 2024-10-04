import { db } from "../../config/db";
import { User } from "../../../db/schema";
import { UserModel } from "../models/model";
import { eq } from "drizzle-orm";
import { hashPassword } from "../utils/AuthUtils";
import { omit } from "lodash";
class AuthRepo {
  private static instance: AuthRepo;

  constructor() {
    if (AuthRepo.instance) {
      return AuthRepo.instance;
    }
    AuthRepo.instance = this;
  }

  async addConsumerAccount(newUser: UserModel) {
    try {
      const user = await db
        .insert(User)
        .values({...newUser, role:"Consumer"} )
        .returning({ insertedId: User.id, username: User.username });

      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Internal server error");
    }
  }

  async getUserAccount(loginKey: string, password: string) {
    try {
      const user: UserModel[] = await db
        .select()
        .from(User)
        .where(eq(User.username, loginKey))
        .limit(1) as UserModel[];

      if (user[0]) {
        const passwordHash = hashPassword(password, user[0].salt);

        if (passwordHash === user[0].password) {
          return {
            message: "Login successful",
            user: omit(user[0], ["password", "salt"]),
          };
        } else {
          return {
            message: "Invalid password",
            user: null,
          };
        }
      } else {
        return {
          message: "User not found",
          user: null,
        };
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Internal server error");
    }
  }

  async hasAccount(loginKey: string) {
    try {

      const user = await db
        .select()
        .from(User)
        .where(eq(User.username, loginKey))
        .limit(1);

      return user.length!==0;
    } catch (error) {
      console.error("Error checking account:", error);
      throw new Error("Internal server error");
    }
  }
}

const instance = new AuthRepo();
Object.freeze(instance);

export default instance;