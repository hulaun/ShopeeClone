const sql = require("mssql");
const db = require("../../config/db");
const crypto = require("crypto");
const { validatePassword } = require("../services/AuthService");

class AuthController {
  async signup(req, res, next) {
    try {
      const loginKey = req.body.loginKey;
      const password = req.body.password;

      const pool = await db.connect();

      const salt = crypto.randomBytes(16).toString("hex");
      const passwordHash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

      let column;
      if (loginKey.includes("@")) {
        column = "Email";
      } else {
        column = "Username";
      }

      const query = `
        INSERT INTO [User] (${column}, Password, Salt)
        VALUES (@LoginKey, @PasswordHash, @Salt)
      `;

      await pool
        .request()
        .input("LoginKey", sql.VarChar(255), loginKey)
        .input("PasswordHash", sql.VarChar(255), passwordHash)
        .input("Salt", sql.VarChar(255), salt)
        .query(query);

      res.status(200).json({ status: "success" });
      console.log("User created successfully.");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
  async signin(req, res, next) {
    try {
      const loginKey = req.body.loginKey;
      const password = req.body.password;

      var user = await validatePassword(loginKey, password);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }
}

module.exports = new AuthController();
