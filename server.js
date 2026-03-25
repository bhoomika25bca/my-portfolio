const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
<<<<<<< HEAD
const PORT = process.env.PORT || 3000;
=======
>>>>>>> 3bf8cf1f3683c46adaf6117a6110ac43550d65bb

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// ✅ MongoDB connection (SAFE)
mongoose.connect("mongodb+srv://bhoomika1045_db_user:hUpvKdea1RWSGDuf@bhoomika-db.orxhwgb.mongodb.net/portfolio")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Mongo Error:", err));

// ✅ Schema
const MessageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
=======
// ✅ DB CONNECTION (Railway with SSL)
const db = mysql.createConnection({
  uri: process.env.MYSQL_URL,
  ssl: {
    rejectUnauthorized: false
  }
>>>>>>> 3bf8cf1f3683c46adaf6117a6110ac43550d65bb
});

db.connect(err => {
  if (err) {
    console.error("❌ DB Connection Error:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

<<<<<<< HEAD
// ✅ Route
app.post("/api/messages", async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();

        res.json({ success: true });
    } catch (err) {
        console.log("Save Error:", err);
        res.json({ success: false });
=======
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
>>>>>>> 3bf8cf1f3683c46adaf6117a6110ac43550d65bb
    }
  );
});

<<<<<<< HEAD
// ✅ Root route (IMPORTANT for Render)
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
=======
// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server running");
});

// ✅ PORT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
>>>>>>> 3bf8cf1f3683c46adaf6117a6110ac43550d65bb
