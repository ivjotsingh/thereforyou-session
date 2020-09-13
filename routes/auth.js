// framework
const express = require("express");
const router = express.Router();

// library
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// model
const User = require("../models/user");

//application-level middle
router.use(express.json());

router.post("/register", async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) return res.status(400).send("email already exists");
  } catch (err) {
    return res.status(500).send(err.message);
  }
  try {
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    if (req.body.dateOfBirth) {
      user[$user.dateOfBirth] = new Date(req.body.dateOfBirth);
    }
    let user_data = await user.save();
    return res.status(200).send(user_data);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
    }
    if (!user || !validPassword) {
      return res.status(400).send("invalid username or password");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return res.header("auth-token", token).send("logged in successfully");
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
