const { omit } = require("lodash");
const { db } = require("../../config/db");
const crypto = require("crypto");
const { sql } = require("mssql");
const AuthRepo = require("../repos/AuthRepo");
const { hashPassword, createSalt } = require("../utils/AuthUtils");
class AuthService {
  async signup(loginKey, password) {
    if (AuthRepo.hasAccount(loginKey)) {
      return {
        status: 400,
        message: "Account already exists.",
        data: { user: null },
      };
    }
    const salt = createSalt();
    const passwordHash = hashPassword(password, salt);
    const user = await AuthRepo.signup(loginKey, passwordHash, salt);
    return { status: 200, message: "Success", data: { user: user } };
  }

  async validatePassword(loginKey, password) {
    if (!loginKey || typeof loginKey !== "string") {
      throw new Error(loginKey + "is null " + password);
    }

    const pool = await db.connect();

    let column;
    if (loginKey.includes("@")) {
      column = "Email";
    } else {
      column = "Username";
    }

    const query = `
      SELECT * FROM [User] 
      WHERE ${column} = @LoginKey
    `;

    const result = await pool
      .request()
      .input("LoginKey", sql.VarChar(255), loginKey)
      .query(query);

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      const passwordHash = crypto
        .pbkdf2Sync(password, user.Salt, 1000, 64, "sha512")
        .toString("hex");

      if (passwordHash === user.Password) {
        return omit(user.toJSON(), ["password", "salt"]);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

module.exports = new AuthService();
