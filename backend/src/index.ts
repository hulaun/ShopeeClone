const express = require("express");
const cors = require("cors");
const app = express();
const port = 5500;

require("dotenv").config({ path: ".env.local" });

const db = require("./config/db");
const route = require("./api/routes");

import { Request, Response } from "express";



app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
    optionsSuccessStatus: 200,
    credentials: true,
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
// } = require("./utils/UsersUtils");

// const users = [];
// for (let i = 0; i < 20; i++) {
//   users.push(generateRandomUser());
// }
// insertUsersIntoDb(users);

async function getUsers() {
  try {
    const pool = await db.connect();
    const result = await pool.request().query("SELECT * FROM [User]");
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

route(app);

app.get("/", async (req: Request, res: Response) => {
  try {
    const usersFromDb = await getUsers();
    res.json({usersFromDb});
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
