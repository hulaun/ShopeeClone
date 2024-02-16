const express = require('express')
const app = express()
const port = 3000
const db = require('./config/db');

async function getStudents() {
  try {
      const pool = await db.connect();
      const result = await pool.request().query('SELECT * FROM Student');
      return result.recordset;
  } catch (error) {
      console.log(error);
  }
}

app.get('/', async (req, res) => {
  const students = await getStudents();
  res.send(students);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})