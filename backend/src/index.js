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

// app.use(methodOverride("_method"));

// const {
//   generateRandomcustomer,
//   insertcustomersIntoDb,
// } = require("./helper/addRandomUsers");

// const customers = [];
// for (let i = 0; i < 20; i++) {
//   customers.push(generateRandomcustomer());
// }
// insertcustomersIntoDb(customers);

async function getCustomers() {
  try {
    const pool = await db.connect();
    const result = await pool.request().query("SELECT * FROM customer"); // Use the customers table
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

route(app);

app.get("/", async (req, res) => {
  const customersFromDb = await getCustomers();
  res.send({ customersFromDb });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
