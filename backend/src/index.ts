const express = require("express");
const cors = require("cors");
const app = express();
const port = 5500;

require("dotenv").config({ path: ".env.local" });

const route = require("./api/routes");

import { query, Request, Response } from "express";
import * as schema from "../db/schema";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const sqlite = new Database("./db/main.db");
export const db = drizzle(sqlite, {
  schema,
});


// app.use(
//   cors({
//     origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
//     optionsSuccessStatus: 200,
//     credentials: true,
//   })
// );

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// const {
//   generateRandomUser,
//   insertUsersIntoDb,
// } = require("./api/utils/UsersUtils");

// const users = Array.from({ length: 20 }, generateRandomUser);
// insertUsersIntoDb(users);

async function getUsers() {
  try {
    const allUsers = await db
      .select()
      .from(schema.User) // Adjust based on your schema definition
      .all();
    return allUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error to handle it in the route
  }
}

// Route to handle GET requests to the root
app.get("/", async (req: Request, res: Response) => {
  try {
    const usersFromDb = await getUsers();
    res.json({usersFromDb});
  } catch (error) {
    console.error("Error in route handler:", error);
    res.status(500).json({ message: "Internal Server Error" }); // Send error response
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
