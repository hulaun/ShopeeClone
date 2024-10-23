import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
const cors = require("cors");
const app: Express = express();
const port = process.env.SERVER_PORT;
const route = require("./api/routes");

app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
