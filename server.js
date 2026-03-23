const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) {
    console.log("DB Connection Error:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

// API
app.post("/api/messages", (req, res) => {
  const { name, email, message } = req.body;

  db.query(
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ success: false });
      }

      res.json({ success: true });
    }
  );
});

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(5000, () => {
  console.log("Server started");
});
