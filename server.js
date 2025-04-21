const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect("mongodb+srv://chamikasanjeewa18:ocdPcTQF0kQPerzq@cluster0.d6kpj.mongodb.net", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Define a Schema and Model
const AccessKeySchema = new mongoose.Schema({
  key: String,
});

const AccessKey = mongoose.model("AccessKey", AccessKeySchema);

// Middleware
app.use(cors());
app.use(express.json());

// Get current access key
app.get("/api/access-key", async (req, res) => {
  try {
    const accessKey = await AccessKey.findOne();
    res.json({ key: accessKey ? accessKey.key : "No Key Set" });
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch access key" });
  }
});

// Update access key
app.post("/api/access-key", async (req, res) => {
  const { newKey } = req.body;
  try {
    const existingKey = await AccessKey.findOne();
    if (existingKey) {
      existingKey.key = newKey;
      await existingKey.save();
    } else {
      const accessKey = new AccessKey({ key: newKey });
      await accessKey.save();
    }
    res.json({ message: "Access Key updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Unable to update access key" });
  }
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));

