const UserLocation = require("../models/user_location");

const updateUserLocation = async (req, res) => {
  const { userId, lat, lng, deviceToken } = req.body;

  try {
    const updated = await UserLocation.findOneAndUpdate(
      { userId },
      {
        location: {
          type: "Point",
          coordinates: [lng, lat],
        },
        deviceToken,
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Location updated", data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update location" });
  }
};

module.exports = { updateUserLocation };
