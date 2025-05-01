const admin = require("firebase-admin");
const serviceAccount = require("./key/serviceAccountKey.json"); // Replace with correct path

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
