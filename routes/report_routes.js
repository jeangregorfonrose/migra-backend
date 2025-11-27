const express = require("express");
const router = express.Router();
const { submitReport, getReports } = require("../controllers/report_controller");
const { authenticate } = require("../middleware/authenticate");

router.post("/report", authenticate, submitReport);
router.get("/reports", getReports);

module.exports = router;
