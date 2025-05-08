// firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("../key/service_account_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
