// const sql = require("mssql");
// const db = require("../../config/db");
// const { hashPassword } = require("../utils/AuthUtils");
// const { omit } = require("lodash");
// class AuthRepo {
//   constructor() {
//     if (AuthRepo.instance) {
//       return AuthRepo.instance;
//     }
//     AuthRepo.instance = this;
//   }

//   async addUser(loginKey, password, salt) {
//     try {
//       const pool = await db.connect();

//       let column;
//       if (loginKey.includes("@")) {
//         column = "Email";
//       } else {
//         column = "Username";
//       }

//       const query = `
//         INSERT INTO [User] (${column}, Password, Salt)
//         OUTPUT inserted.*
//         VALUES (@LoginKey, @PasswordHash, @Salt)
//       `;

//       const result = await pool
//         .request()
//         .input("LoginKey", sql.VarChar(255), loginKey)
//         .input("PasswordHash", sql.VarChar(255), password)
//         .input("Salt", sql.VarChar(255), salt)
//         .query(query);

//       const user = result.recordset[0];
//       return user;
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   }

//   async getUserAccount(loginKey, password) {
//     try {
//       const pool = await db.connect();

//       let column;
//       if (loginKey.includes("@")) {
//         column = "Email";
//       } else {
//         column = "Username";
//       }

//       const query = `
//         SELECT * FROM [User]
//         WHERE ${column} = @LoginKey
//       `;

//       const result = await pool
//         .request()
//         .input("LoginKey", sql.VarChar(255), loginKey)
//         .query(query);

//       if (result.recordset.length > 0) {
//         const user = result.recordset[0];
//         const passwordHash = hashPassword(password, user.Salt);

//         if (passwordHash === user.Password) {
//           return {
//             message: "Login successful",
//             user: omit(user, ["Password", "Salt"]),
//           };
//         } else {
//           return {
//             message: "Invalid password",
//             user: null,
//           };
//         }
//       } else {
//         return {
//           message: "User not found",
//           user: null,
//         };
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//     }
//   }
//   hasAccount = async (loginKey) => {
//     try {
//       const pool = await db.connect();

//       let column;
//       if (loginKey.includes("@")) {
//         column = "Email";
//       } else {
//         column = "Username";
//       }

//       const query = `
//         SELECT * FROM [User]
//         WHERE ${column} = @LoginKey
//       `;

//       const result = await pool
//         .request()
//         .input("LoginKey", sql.VarChar(255), loginKey)
//         .query(query);

//       return result.recordset.length > 0;
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };
// }

// const instance = new AuthRepo();
// Object.freeze(instance);

// module.exports = instance;
