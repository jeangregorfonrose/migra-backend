const mongoose = require("mongoose");

const UserLocationSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // You can adjust based on your auth setup
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },
  deviceToken: { type: String }, // For push notifications
  updatedAt: { type: Date, default: Date.now },
});

UserLocationSchema.index({ location: "2dsphere" });

const UserLocation = mongoose.model("UserLocation", UserLocationSchema);

module.exports = UserLocation;
