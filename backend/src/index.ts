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

const {
  generateRandomUser,
  insertUsersIntoDb,
} = require("./utils/UsersUtils");

const users = Array.from({ length: 20 }, generateRandomUser);
insertUsersIntoDb(users);

async function getUsers() {
  try {
    const allUsers = await db
      .select()
      .from(users) // Adjust based on your schema definition
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
    res.json({ usersFromDb });
  } catch (error) {
    console.error("Error in route handler:", error);
    res.status(500).json({ message: "Internal Server Error" }); // Send error response
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
