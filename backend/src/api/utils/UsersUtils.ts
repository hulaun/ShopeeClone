import { UserModel } from "../models/model";
import { db } from "../../config/db"
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
  const role = faker.random.arrayElement(["Consumer", "Vendor"]);

  return {
    username,
    email,
    profilePicture,
    password,
    salt,
    fullName,
    gender,
    userAddress,
    phoneNumber,
    role,
  };
}

async function insertUsersIntoDb(users: UserModel[]) {
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

module.exports = { generateRandomUser, insertUsersIntoDb };
