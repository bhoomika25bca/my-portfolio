const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  uri: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect(err => {
  if (err) {
    console.error("❌ DB Connection Error:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// ✅ Create table if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT
  )
`);

// ✅ API
app.post("/api/messages", (req, res) => {
  const { name, email, message } = req.body;

  db.query(
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    (err) => {
      if (err) {
        console.log("❌ SQL ERROR:", err);
        return res.json({ success: false });
      }
      res.json({ success: true });
    }
  );
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server running");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});