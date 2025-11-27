const express = require("express");
const router = express.Router();
const { submitReport, getReports } = require("../controllers/report_controller");
const validateRequest = require("../middleware/validation");
const { reportSchema } = require("../utils/schemas");
const { authenticate } = require("../middleware/authenticate");

router.post("/report", authenticate, validateRequest(reportSchema), submitReport);
router.get("/reports", getReports);

module.exports = router;
