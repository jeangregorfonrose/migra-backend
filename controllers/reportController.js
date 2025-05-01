const Report = require("../models/Report");
const UserLocation = require("../models/userLocation");

const submitReport = async (req, res) => {
  try {
    const { description, lat, lng } = req.body;

    const newReport = new Report({
      description,
      location: {
        type: "Point",
        coordinates: [lng, lat], // Note: longitude comes first
      },
    });

    await newReport.save();

    // Radius in meters (e.g., 5 km)
    const radiusInMeters = 5000;

    // Find users within the radius
    const nearbyUsers = await UserLocation.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: radiusInMeters,
        },
      },
    });

    console.log("Nearby users:", nearbyUsers);

    // Get device tokens to send notifications
    const deviceTokens = nearbyUsers
      .map((user) => user.deviceToken)
      .filter(Boolean);

    // (Next Step) Send push notifications via FCM
    console.log("Nearby device tokens:", deviceTokens);

    // Send notifications
    // await sendNotificationToNearbyUsers(filteredUsers, { lat, lng });

    res.status(201).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating report", error });
  }
};

module.exports = { submitReport };
