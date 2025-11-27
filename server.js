// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const reportRoutes = require("./routes/report_routes");
const registerRoutes = require("./routes/register_routes");
const morgan = require("morgan");
const logger = require("./utils/logger");


// Jobs
require("./jobs/report_deactivation_job");

dotenv.config(); // Load environment variables from .env file

const app = express();

// HTTP request logging
app.use(morgan('combined', {
  stream: {
    write: (msg) => logger.info(msg.trim())
  }
}));


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
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("Error connecting to MongoDB", error));

// Default route
// app.get("/", (req, res) => res.send("Welcome to the Immigration Report API"));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
