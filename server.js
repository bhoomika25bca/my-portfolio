const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ DB CONNECTION (Railway with SSL)
const db = mysql.createConnection({
  uri: process.env.MYSQL_URL,
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

// ✅ API
app.post("/api/messages", (req, res) => {
  const { name, email, message } = req.body;

  db.query(
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    (err, result) => {
      if (err) {
        console.log("❌ SQL ERROR:", err);
        return res.json({ success: false });
      }

      res.json({ success: true });
    }
  );
});

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server running");
});

// ✅ PORT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
