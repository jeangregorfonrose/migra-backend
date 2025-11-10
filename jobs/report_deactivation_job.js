const cron = require("node-cron");
const Report = require("../models/report");

// Job to deactivate reports older than 1 hour
// Runs every hour
cron.schedule("0 * * * *", async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  try {
    const result = await Report.updateMany(
      { active: true, timestamp: { $lte: oneHourAgo } },
      { $set: { active: false } }
    );
    console.log(`Updated ${result.modifiedCount} documents`);
  } catch (err) {
    console.error("Error updating documents:", err);
  }
});
