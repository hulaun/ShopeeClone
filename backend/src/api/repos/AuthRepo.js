const sql = require("mssql");
const { hashPassword } = require("../utils/AuthUtils");
const db = require("../../config/db");
class AuthRepo {
  async signup(loginKey, password, salt) {
    try {
      const pool = await db.connect();

      let column;
      if (loginKey.includes("@")) {
        column = "Email";
      } else {
        column = "Username";
      }

      const query = `
        INSERT INTO [User] (${column}, Password, Salt)
        OUTPUT inserted.*
        VALUES (@LoginKey, @PasswordHash, @Salt)
      `;

      const refult = await pool
        .request()
        .input("LoginKey", sql.VarChar(255), loginKey)
        .input("PasswordHash", sql.VarChar(255), password)
        .input("Salt", sql.VarChar(255), salt)
        .query(query);

      const user = result.recordset[0];
      console.log("User created successfully:", user);
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  async signin(loginKey, password) {
    try {
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
        const passwordHash = hashPassword(password, user.Salt);

        if (passwordHash === user.Password) {
          return {
            appStatus: "Login successful",
            user: omit(user.toJSON(), ["password", "salt"]),
          };
        } else {
          return {
            appStatus: "Invalid password",
            user: null,
          };
        }
      } else {
        return {
          appStatus: "User not found",
          user: null,
        };
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }
  hasAccount = async (loginKey) => {
    try {
      const pool = await db.connect();

      let column;
      if (loginKey.includes("@")) {
        column = "Email";
      } else {
        column = "Username";
      }
      console.log("column:", column, "loginKey:", loginKey);

      const query = `
        SELECT * FROM [User] 
        WHERE ${column} = @LoginKey
      `;

      const result = await pool
        .request()
        .input("LoginKey", sql.VarChar(255), loginKey)
        .query(query);

      console.log("result:", result.recordset[0]);

      return result.recordset.length > 0;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
}

module.exports = new AuthRepo();
