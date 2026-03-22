const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🔗 CONNECT MONGODB
mongoose.connect("mongodb+srv://bhoomika1045_db_user:hUpvKdea1RWSGDuf@bhoomika-db.orxhwgb.mongodb.net/portfolio?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// 📦 SCHEMA
const MessageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Message = mongoose.model("Message", MessageSchema);

// 📩 SAVE DATA
app.post("/api/messages", async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();

        res.json({ success: true });

    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log("Server running");
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
