const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"], // Required for GeoJSON
      default: "Point",
    },
    coordinates: {
      type: [Number], // Format: [longitude, latitude]
      required: true,
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Enable geospatial index
ReportSchema.index({ location: "2dsphere" });

const Report = mongoose.model("reports", ReportSchema);

module.exports = Report;
