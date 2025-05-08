const express = require("express");
const router = express.Router();
const { submitReport } = require("../controllers/report_controller");
const UserLocation = require("../models/userLocation");

router.post("/report", submitReport);

router.get("/test-nearby", async (req, res) => {
  const testLng = -73.935242; // use same area where you added users
  const testLat = 40.73061;
  const radiusInMeters = 5000;

  try {
    const users = await UserLocation.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [testLng, testLat],
          },
          $maxDistance: radiusInMeters,
        },
      },
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error finding nearby users" });
  }
});


module.exports = router;
