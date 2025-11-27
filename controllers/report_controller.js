const Report = require("../models/report");
const { createResponse } = require("../utils/responseTemplate");
const logger = require("../utils/logger");

const submitReport = async (req, res) => {
  try {
    // Fix Mass Assignment: Explicitly pick fields
    const { description, address, location } = req.body;

    logger.info("Received report", { data: { user: req.user.uid, report: { description, address, location } } });

    const newReport = new Report({
      description,
      address,
      location,
      // active and timestamp are set by default in the schema
    });

    await newReport.save();

    logger.info("Report saved successfully:", { data: { report: newReport } });
    res.status(201).json(createResponse("success", "Report created successfully", newReport));
  } catch (error) {
    logger.error("Error creating report:", error);
    res.status(500).json(createResponse("error", "Error creating report", error));
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ active: true });
    res.status(200).json(reports);
  } catch (error) {
    logger.error("Error fetching reports:", error);
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

module.exports = { submitReport, getReports };
