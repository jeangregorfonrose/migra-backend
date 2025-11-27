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
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");


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

// Security Middleware
app.use(helmet()); // Set security headers
app.use(cors()); // Enable CORS (allow all origins for now, configure as needed)

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);


// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", reportRoutes);
app.use("/api", registerRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("Error connecting to MongoDB", error));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Start server
// Start server only if run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
}

module.exports = app;
