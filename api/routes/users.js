const express = require("express");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.post(
  "/",
  catchAsync(async function (req, res, next) {
    const { username, password } = req.body;
    const regUser = new User({ username, email: username });
    await User.register(regUser, password);
    req.login(regUser, (err) => {
      if (err) return next(err);
      res.send({
        message: "Success",
        username: regUser.username,
        id: regUser._id,
      });
    });
  })
);

router.post(
  "/login",
  catchAsync(async function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) return next(err);
      if (!user) return res.send({ error: "Invalid Credentials" });
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.send({
          message: "Success",
          username: user.username,
          id: user._id,
        });
      });
    })(req, res, next);
  })
);

router.get(
  "/logout",
  catchAsync(async function (req, res) {
    req.logout();
    res.send({ message: "Success" });
  })
);

module.exports = router;
