const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/registerController");
const { authenticate } = require("../middleware/authenticate");

router.post("/register", authenticate, registerUser);

module.exports = router;