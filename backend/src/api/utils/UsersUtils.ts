import { UserModel } from "../models/model";
import { db } from "../../config/db"
import { eq } from "drizzle-orm";
const faker = require("faker");
const { createSalt, hashPassword } = require("./AuthUtils");
const schema = require("../../../db/schema");

function generateRandomUser() {
  const username = faker.name.findName();
  const email = faker.internet.email();
  const profilePicture = faker.image.avatar();
  const passwordV1 = faker.internet.password();
  const salt = createSalt();
  const password = hashPassword(passwordV1, salt);
  const fullName = faker.name.findName();
  const gender = faker.random.arrayElement(["F", "M", "O"]);
  const userAddress = faker.address.streetAddress();
  const phoneNumber = faker.phone.phoneNumber();
  const dob = faker.date.past(50, new Date()).toISOString().split("T")[0];
  const status = faker.random.arrayElement(["Inactive", "Blocked"]);
  const role = faker.random.arrayElement(["Consumer", "Vendor"]);

  return {
    username,
    email,
    profilePicture,
    password,
    salt,
    fullName,
    gender,
    dob,
    status,
    userAddress,
    phoneNumber,
    role,
  };
}

function generateNewAdminUser(name: string="admin") {
  const username = name;
  const email = faker.internet.email();
  const profilePicture = faker.image.avatar();
  const passwordV1 = "admin";
  const salt = createSalt();
  const password = hashPassword(passwordV1, salt);
  const fullName = faker.name.findName();
  const gender = faker.random.arrayElement(["F", "M", "O"]);
  const userAddress = faker.address.streetAddress();
  const phoneNumber = faker.phone.phoneNumber();
  const dob = faker.date.past(50, new Date()).toISOString().split("T")[0];
  const status = faker.random.arrayElement(["Inactive", "Blocked"]);
  const role = "Admin";

  return {
    username,
    email,
    profilePicture,
    password,
    salt,
    fullName,
    gender,
    dob,
    status,
    userAddress,
    phoneNumber,
    role,
  };
}

async function insertUsersIntoDb(users:any) {
  try {
    for (const user of users) {
      console.log("Inserting user:", user);
      await db
        .insert(schema.User)
        .values({...user})
        .run();
    }
  } catch (error) {
    console.error("Error inserting Users:", error);
  }
}

async function addDobToEachUser() {
  try {
    const users = await db.select().from(schema.User);

    for (const user of users) {
      const dob = faker.date.past(50, new Date()).toISOString().split("T")[0];
      await db
        .update(schema.User)
        .set({ dob })
        .where(eq(schema.User.id, user.id))
        .run();
    }
  } catch (error) {
    console.error("Error adding DOB to each user:", error);
  }
}

async function generateRandomUsersAndInsertIntoDb(count: number) {
  const users= [];
  for (let i = 0; i < count; i++) {
    users.push(generateRandomUser());
  }

  await insertUsersIntoDb(users);
}

async function convertUserToAdmin(userId: string, username: string="admin") {
  try {
    // Fetch the user by ID
    const user = await db.select().from(schema.User).where(eq(schema.User.id, userId));

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Update user fields
    const newUsername = username;
    const newSalt = createSalt();
    const newPassword = hashPassword('admin', newSalt);
    const newRole = 'Admin';

    // Update the user in the database
    await db
      .update(schema.User)
      .set({
        username: newUsername,
        password: newPassword,
        salt: newSalt,
        role: newRole,
      })
      .where(eq(schema.User.id, userId));

    console.log(`User with ID ${userId} has been converted to Admin`);
  } catch (error) {
    console.error("Error converting user to Admin:", error);
  }
}

async function convertUserToConsumer(userId: string, username: string="consumer") {
  try {
    // Fetch the user by ID
    const user = await db.select().from(schema.User).where(eq(schema.User.id, userId));

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Update user fields
    const newUsername = username;
    const newSalt = createSalt();
    const newPassword = hashPassword('consumer', newSalt);
    const newRole = 'Consumer';

    // Update the user in the database
    await db
      .update(schema.User)
      .set({
        username: newUsername,
        password: newPassword,
        salt: newSalt,
        role: newRole,
      })
      .where(eq(schema.User.id, userId));

    console.log(`User with ID ${userId} has been converted to Admin`);
  } catch (error) {
    console.error("Error converting user to Admin:", error);
  }
}

async function convertUserToVendor(userId: string, username: string="vendor") {
  try {
    // Fetch the user by ID
    const user = await db.select().from(schema.User).where(eq(schema.User.id, userId));

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Update user fields
    const newUsername = username;
    const newSalt = createSalt();
    const newPassword = hashPassword('vendor', newSalt);
    const newRole = 'Vendor';

    // Update the user in the database
    await db
      .update(schema.User)
      .set({
        username: newUsername,
        password: newPassword,
        salt: newSalt,
        role: newRole,
      })
      .where(eq(schema.User.id, userId));

    console.log(`User with ID ${userId} has been converted to Vendor`);
  } catch (error) {
    console.error("Error converting user to Admin:", error);
  }
}

module.exports = {generateRandomUser,  insertUsersIntoDb,  convertUserToAdmin,  convertUserToConsumer,convertUserToVendor,  generateRandomUsersAndInsertIntoDb, generateNewAdminUser, addDobToEachUser};
