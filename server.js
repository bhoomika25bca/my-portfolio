const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ MySQL connection using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,       // from Render MySQL
    user: process.env.DB_USER,       // from Render MySQL
    password: process.env.DB_PASSWORD, // from Render MySQL
    database: process.env.DB_NAME    // your database
});

db.connect(err => {
    if(err){
        console.log("DB Connection Error:", err);
    } else {
        console.log("MySQL Connected ✅");
    }
});

// ✅ API route to save contact messages
app.post("/api/messages", (req, res) => {
    const { name, email, message } = req.body;

    if(!name || !email || !message){
        return res.json({ success: false, error: "All fields are required" });
    }

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if(err){
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
