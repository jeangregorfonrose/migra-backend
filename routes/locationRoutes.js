const express = require("express");
const router = express.Router();
const { updateUserLocation } = require("../controllers/locationController");

router.post("/location", updateUserLocation);

module.exports = router;
