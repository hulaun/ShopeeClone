// const db = require("../../config/db");
// class UserController {
//   async show(req, res, next) {
//     try {
//       const pool = await db.connect();
//       const result = await pool.request().query("SELECT * FROM [User]"); // Use the customers table
//       const users = result.recordset;
//       res.json({ users });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// module.exports = new UserController();
