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
    const pool = await db.connect();

    for (const user of users) {
      await pool
        .request()
        .input("Username", user.userName)
        .input("Password", user.passwordHash)
        .input("Salt", user.salt)
        .input("Email", user.email)
        .input("ProfilePicture", user.profilePicture)
        .input("FullName", user.fullName)
        .input("Gender", user.gender)
        .input("UserAddress", user.userAddress)
        .input("PhoneNumber", user.phoneNumber)
        .query(
          "INSERT INTO [User] (Username, Password, Salt, Email, ProfilePicture, FullName, Gender, UserAddress, PhoneNumber) " +
            "VALUES (@Username, @Password, @Salt, @Email, @ProfilePicture, @FullName, @Gender, @UserAddress, @PhoneNumber)"
        );
    }
  } catch (error) {
    console.error("Error inserting Users:", error);
  }
}

module.exports = { generateRandomUser, insertUsersIntoDb };
