const sql = require("mssql");

let pool: any;

async function connect() {
  try {
    if (!pool) {
      pool = sql.connect({
        user: "sa",
        password: "12345",
        server: "localhost",
        database: "ShopeeClone",
        options: {
          encrypt: true, // Use this if you're on Windows Azure
          trustServerCertificate: true, // Change to false if you don't want to trust the certificate chain
        },
        port: 1433,
      });
    }
    return pool;
  } catch (error) {
    console.log("Connect failure!!!");
  }
}

module.exports = { connect };
