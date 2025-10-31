const Report = require("../models/report");
const UserLocation = require("../models/user_location");
const { createResponse } = require("../utils/responseTemplate");

const submitReport = async (req, res) => {
  try {
    const report = req.body;

    console.log("Received report:", req.body);

    const newReport = new Report(report);

    await newReport.save();

    // Radius in meters (e.g., 5 km)
    // const radiusInMeters = 5000;

    // Find users within the radius
    // const nearbyUsers = await UserLocation.find({
    //   location: {
    //     $nearSphere: {
    //       $geometry: {
    //         type: "Point",
    //         coordinates: [lng, lat],
    //       },
    //       $maxDistance: radiusInMeters,
    //     },
    //   },
    // });

    // console.log("Nearby users:", nearbyUsers);

    // Get device tokens to send notifications
    // const deviceTokens = nearbyUsers
    //   .map((user) => user.deviceToken)
    //   .filter(Boolean);

    // (Next Step) Send push notifications via FCM
    // console.log("Nearby device tokens:", deviceTokens);

    // Send notifications
    // await sendNotificationToNearbyUsers(filteredUsers, { lat, lng });

    res.status(201).json(createResponse("success", "Report created successfully", newReport));
  } catch (error) {
    console.error(error);
    res.status(500).json(createResponse("error", "Error creating report", error));
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

module.exports = { submitReport, getReports };
