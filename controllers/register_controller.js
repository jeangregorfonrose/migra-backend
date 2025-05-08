const User = require("../models/user");

const registerUser = async (req, res) => {
  const { email, uid } = req.user;
  const { location } = req.body;

  try {
    // Check if user already exists
    const existing = await User.findOne({ uid });
    if (existing)
      return res.status(200).json({ message: "User already registered" });

    const newUser = new User({
      uid,
      email,
      location, // optional at this stage
    });

    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
    console.log(err);
  }
}

module.exports = { registerUser };
