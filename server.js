const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// TEMP FIX ROUTE (IMPORTANT)
app.post("/api/messages", (req, res) => {
    console.log("Received:", req.body);

    res.json({ success: true });
});

// MySQL (can stay for now, but won’t work on Render)
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bhoomika@2005",
    database: "portfolio_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database error:", err);
    } else {
        console.log("Connected to MySQL ✅");
    }
});

app.listen(PORT, () => {
    console.log(`Server running`);
});
