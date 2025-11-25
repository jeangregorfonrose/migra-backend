const cron = require("node-cron");
const Report = require("../models/report");
const logger = require("../utils/logger");

// Job to deactivate reports older than 1 hour
// Runs every hour
cron.schedule("0 * * * *", async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  try {
    const result = await Report.updateMany(
      { active: true, timestamp: { $lte: oneHourAgo } },
      { $set: { active: false } }
    );
    logger.info(`Updated ${result.modifiedCount} documents`);
  } catch (err) {
    logger.error(err, "Error updating documents:");
  }
});
