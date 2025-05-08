const express = require("express");
const router = express.Router();
const { updateUserLocation } = require("../controllers/location_controller");

router.post("/location", updateUserLocation);

module.exports = router;
