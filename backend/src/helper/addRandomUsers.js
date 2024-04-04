const faker = require("faker");
const crypto = require("crypto");

function generateRandomUser() {
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const googleId = null;
  const facebookId = null;
  const profilePicture = faker.image.avatar();
  const password = faker.internet.password();
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    username,
    email,
    googleId,
    facebookId,
    profilePicture,
    passwordHash,
    salt,
  };
}

async function insertUsersIntoDb() {
  try {
    const pool = await db.connect();

    for (const user of users) {
      await pool
        .request()
        .input("Username", user.username)
        .input("Password", user.passwordHash)
        .input("Email", user.email)
        .input("GoogleID", user.googleId)
        .input("FacebookID", user.facebookId)
        .input("ProfilePicture", user.profilePicture)
        .query(
          "INSERT INTO Users (Username, Password, Email, GoogleID, FacebookID, ProfilePicture) " +
            "VALUES (@Username, @Password, @Email, @GoogleID, @FacebookID, @ProfilePicture)"
        );
    }

    console.log("Generated users inserted successfully.");
  } catch (error) {
    console.error("Error inserting users:", error);
  }
}

module.exports = { generateRandomUser, insertUsersIntoDb };
