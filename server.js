// File: server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = "admin_secret";

mongoose.connect(
  "mongodb+srv://chamikasanjeewa18:ocdPcTQF0kQPerzq@cluster0.d6kpj.mongodb.net/admin-panel?retryWrites=true&w=majority"
);

const userSchema = new mongoose.Schema({
  ip: String,
  accessKey: String,
  lastUpdate: String,
});
const User = mongoose.model("User", userSchema);

const settingsSchema = new mongoose.Schema({
  currentAccessKey: String,
  latestMessage: String,
});
const Setting = mongoose.model("Setting", settingsSchema);

// Admin Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "anjana" && password === "anjana970") {
    const token = jwt.sign({ username }, SECRET_KEY);
    return res.json({ token });
  }
  return res.status(401).json({ error: "Invalid credentials" });
});

// Middleware to verify token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

// Get all users
app.get("/users", authMiddleware, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Send update message
app.post("/send-update", authMiddleware, async (req, res) => {
  const { message } = req.body;
  let setting = await Setting.findOne();
  if (!setting) {
    setting = new Setting({ currentAccessKey: "", latestMessage: message });
  } else {
    setting.latestMessage = message;
  }
  await setting.save();
  res.json({ success: true });
});

// Change access key
app.post("/change-key", authMiddleware, async (req, res) => {
  const { newKey } = req.body;
  let setting = await Setting.findOne();
  if (!setting) {
    setting = new Setting({ currentAccessKey: newKey });
  } else {
    setting.currentAccessKey = newKey;
  }
  await setting.save();
  res.json({ success: true });
});

// Get setting for frontend to check
app.get("/get-settings", async (req, res) => {
  const setting = await Setting.findOne();
  res.json(setting);
});

// Save user IP and accessKey
app.post("/register-user", async (req, res) => {
  const { ip, accessKey } = req.body;
  let user = await User.findOne({ ip });
  if (!user) {
    user = new User({ ip, accessKey, lastUpdate: new Date().toISOString() });
  } else {
    user.accessKey = accessKey;
    user.lastUpdate = new Date().toISOString();
  }
  await user.save();
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
