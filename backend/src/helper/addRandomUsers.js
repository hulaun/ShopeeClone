const faker = require("faker");
const crypto = require("crypto");
const db = require("../config/db");

function generateRandomcustomer() {
  const customerName = faker.name.findName();
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
    customerName,
    email,
    googleId,
    facebookId,
    profilePicture,
    passwordHash,
    salt,
  };
}

async function insertcustomersIntoDb(customers) {
  try {
    const pool = await db.connect();

    for (const customer of customers) {
      await pool
        .request()
        .input("Username", customer.customerName)
        .input("Password", customer.passwordHash)
        .input("Email", customer.email)
        .input("GoogleID", customer.googleId)
        .input("FacebookID", customer.facebookId)
        .input("ProfilePicture", customer.profilePicture)
        .query(
          "INSERT INTO Customer (Username, Password, Email, GoogleID, FacebookID, ProfilePicture) " +
            "VALUES (@Username, @Password, @Email, @GoogleID, @FacebookID, @ProfilePicture)"
        );
    }

    console.log("Generated customers inserted successfully.");
  } catch (error) {
    console.error("Error inserting customers:", error);
  }
}

module.exports = { generateRandomcustomer, insertcustomersIntoDb };
