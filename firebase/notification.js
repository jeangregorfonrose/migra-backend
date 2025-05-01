// notifications.js
const admin = require("./firebase");

async function sendNotificationToNearbyUsers(users, reportData) {
  const messages = users.map((user) => ({
    token: user.deviceToken,
    notification: {
      title: "🚨 Immigration Alert Nearby",
      body: `Reported near ${reportData.locationName || "your area"}`,
    },
    data: {
      lat: reportData.lat.toString(),
      lng: reportData.lng.toString(),
    },
  }));

  const responses = await Promise.allSettled(
    messages.map((msg) => admin.messaging().send(msg))
  );

  responses.forEach((res, idx) => {
    if (res.status === "fulfilled") {
      console.log(`Notification sent to ${users[idx].userId}`);
    } else {
      console.error(`Failed to send to ${users[idx].userId}`, res.reason);
    }
  });
}

module.exports = sendNotificationToNearbyUsers;
