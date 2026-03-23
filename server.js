const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "your-host",
  user: "your-user",
  password: "your-password",
  database: "your-database"
});

// API route (THIS IS WHAT YOU ASKED)
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

      res.json({ success: true }); // ✅ IMPORTANT
    }
  );
});

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
