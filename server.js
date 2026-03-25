const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection (SAFE)
mongoose.connect("mongodb+srv://bhoomika1045_db_user:hUpvKdea1RWSGDuf@bhoomika-db.orxhwgb.mongodb.net/portfolio")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Mongo Error:", err));

// ✅ Schema
const MessageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Message = mongoose.model("Message", MessageSchema);

// ✅ Route
app.post("/api/messages", async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();

        res.json({ success: true });
    } catch (err) {
        console.log("Save Error:", err);
        res.json({ success: false });
    }
});

// ✅ Root route (IMPORTANT for Render)
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});