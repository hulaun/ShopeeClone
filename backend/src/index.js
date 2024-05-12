const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const db = require("./config/db");
const route = require("./routes");

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (
//         [
//           "http://localhost:8080",
//           "http://127.0.0.1:8080",
//         ].indexOf(origin) !== -1
//       ) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     optionsSuccessStatus: 200,
//   })
// );

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// app.use(methodOverride("_method"));

// const {
//   generateRandomUser,
//   insertUsersIntoDb,
// } = require("./utils/addRandomUsers");

// const users = [];
// for (let i = 0; i < 20; i++) {
//   users.push(generateRandomUser());
// }
// insertUsersIntoDb(users);

async function getUsers() {
  try {
    const pool = await db.connect();
    const result = await pool.request().query("SELECT * FROM [User]"); // Use the users table
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

route(app);

app.get("/", async (req, res) => {
  const usersFromDb = await getUsers();
  res.send({ usersFromDb });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
