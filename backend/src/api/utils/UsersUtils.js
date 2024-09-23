const faker = require("faker");
const db = require("../../config/db");
const { createSalt, hashPassword } = require("./AuthUtils");
const schema = require("../../../db/schema");

function generateRandomUser() {
  const userName = faker.name.findName();
  const email = faker.internet.email();
  const profilePicture = faker.image.avatar();
  const password = faker.internet.password();
  const salt = createSalt();
  const passwordHash = hashPassword(password, salt);
  const fullName = faker.name.findName();
  const gender = faker.datatype.boolean() ? "F" : "M";
  const userAddress = faker.address.streetAddress();
  const phoneNumber = faker.phone.phoneNumber();

  return {
    userName,
    email,
    profilePicture,
    passwordHash,
    salt,
    fullName,
    gender,
    userAddress,
    phoneNumber,
  };
}

async function insertUsersIntoDb(users) {
  try {
    for (const user of users) {
      console.log("Inserting user:", user);
      await db.db
        .insert(schema.User)
        .values({
          username: user.userName,
          password: user.passwordHash,
          salt: user.salt,
          email: user.email,
          profilePicture: user.profilePicture,
          fullName: user.fullName,
          gender: user.gender,
          userAddress: user.userAddress,
          phoneNumber: user.phoneNumber,
        })
        .run();
    }
  } catch (error) {
    console.error("Error inserting Users:", error);
  }
}

module.exports = { generateRandomUser, insertUsersIntoDb };
