const faker = require("faker");
const db = require("../../config/db");
const { createSalt, hashPassword } = require("./AuthUtils");

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
      await db
        .insert(users)
        .values({
          Username: user.userName,
          Password: user.passwordHash,
          Salt: user.salt,
          Email: user.email,
          ProfilePicture: user.profilePicture,
          FullName: user.fullName,
          Gender: user.gender,
          UserAddress: user.userAddress,
          PhoneNumber: user.phoneNumber,
        })
        .run();
    }
  } catch (error) {
    console.error("Error inserting Users:", error);
  }
}

module.exports = { generateRandomUser, insertUsersIntoDb };
