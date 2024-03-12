const sql = require("mssql");

async function connect() {
  try {
    const pool = await sql.connect({
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
    console.log("Connect successfully!!!");
    return pool;
  } catch (error) {
    console.log("Connect failure!!!");
  }
}

module.exports = { connect };
