const express = require("express");
const admin = require("../firebase/firebase");
const logger = require("../utils/logger");

// Middleware to verify Firebase ID token
const authenticate = async (req, res, next) => {
  // get authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logger.warn("No authorization header or malformed header");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    logger.info("Token verified for user:", decodedToken.uid);
    next();
  } catch (error) {
    logger.error("Error verifying token:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { authenticate };
