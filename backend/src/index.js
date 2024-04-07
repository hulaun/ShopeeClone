const express = require("express");
const app = express();
const port = 3000;

const db = require("./config/db");
const route = require("./routes");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(methodOverride("_method"));

async function getUsers() {
  try {
    const pool = await db.connect();
    const result = await pool.request().query("SELECT * FROM Users"); // Use the Users table
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

// const users = [];
// for (let i = 0; i < 20; i++) {
//   users.push(generateRandomUser());
// }

// insertUsersIntoDb();

route(app);

app.get("/", async (req, res) => {
  const usersFromDb = await getUsers();
  res.send({ usersFromDb });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
