// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const reportRoutes = require("./routes/report_routes");
const locationRoutes = require("./routes/location_routes");
const registerRoutes = require("./routes/register_routes");

// Jobs
require("./jobs/report_deactivation_job");

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", reportRoutes);
app.use("/api", locationRoutes);
app.use("/api", registerRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB", error));

// Default route
// app.get("/", (req, res) => res.send("Welcome to the Immigration Report API"));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
