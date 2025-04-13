const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://smitmpatel0603:Patel0610@cluster0.g5qbdum.mongodb.net/formApp?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ Connection error:", err));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
