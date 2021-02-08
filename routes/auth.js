// framework
const express = require("express");
const router = express.Router();

// library
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

// model
const User = require("../user/user");

//controller
const craeteTokens = require("../token/createTokens");

//application-level middleware
router.use(express.json());

router.post("/register", async (req, res) => {
  try {
    const userNameExists = await User.findOne({ userName: req.body.userName });
    if (userNameExists) return res.status(400).send("user name already exists");

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send("email already exists");
  } catch (err) {
    return res.status(500).send(err.message);
  }
  try {
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let dob = Date;
    if (req.body.dateOfBirth) {
      dob = new Date(req.body.dateOfBirth);
    } else {
      dob = null;
    }

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: dob,
    });

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

      if (!user || !validPassword) {
        return res.status(403).send("Invalid Emailid or Password");
      }
    }
    let { access_token, refresh_token } = await createTokens(user.userName);
    res.cookie("auth-token", access_token, {
      maxAge: 900000,
      //To mitigate XSS attacks
      httpOnly: true,
      //To mitigate interception ,over HTTPS only ,
      // in dev env with HTTP this will be set to false
      secure: process.env.NODE_ENV === "production" ? true : false,
    });
    res.cookie("refresh-token", refresh_token, {
      maxAge: 900000,
      //To mitigate XSS attacks
      httpOnly: true,
      //To mitigate interception ,over HTTPS only ,
      // in dev env with HTTP this will be set to false
      secure: process.env.NODE_ENV === "production" ? true : false,
    });
    return res.status(200).send("Logged in successfully!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server side error");
  }
});

module.exports = router;
