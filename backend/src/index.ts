import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import ChatRoomController from "./api/controllers/ChatRoomController";
dotenv.config({ path: ".env.local" });
const cors = require("cors");
const app: Express = express();
const server = createServer(app);
const port = process.env.SERVER_PORT;
const route = require("./api/routes");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  },
});

const chatNamespace = io.of("/chat");
chatNamespace.on("connection", (socket) => {
  console.log("a user connected");
  ChatRoomController.handleConnection(io, socket);
});

app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);


// const {generateRandomUser, insertUsersIntoDb} = require("./api/utils/UsersUtils");
// const users = [];
// for (let i = 0; i < 10; i++) {
//   users.push(generateRandomUser());
// }
// insertUsersIntoDb(users);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

route(app);

// Start the server
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
