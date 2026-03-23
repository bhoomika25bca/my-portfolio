const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
    host: "your-online-host",
    user: "your-username",
    password: "Bhoomika@2005",
    database: "portfolio"
});

db.connect(err => {
    if(err) {
        console.log("DB Connection Error:", err);
    } else {
        console.log("MySQL Connected ✅");
    }
});

// ✅ Route to save messages
app.post("/api/messages", (req, res) => {
    const { name, email, message } = req.body;

    if(!name || !email || !message) {
        return res.json({ success: false, error: "All fields are required" });
    }

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if(err) {
            console.log("Save Error:", err);
            return res.json({ success: false });
        }
        res.json({ success: true, id: result.insertId });
    });
});

// ✅ Root route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
