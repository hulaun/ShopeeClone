import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { runSockets } from './socket';
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

runSockets(io);

app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

route(app);

// const {convertUserToVendor} = require("./api/utils/UsersUtils");
// const {generateAndInsertSeedData, addImagesToProductCategory} = require("./api/utils/ShopProductUtils");
// generateAndInsertSeedData();
// addImagesToProductCategory()
// Start the server
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
