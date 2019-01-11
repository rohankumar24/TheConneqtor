const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../../models/User");

/*
type: get
@route - /api/users/
@desc - simple testing route
@access - public
*/

router.get("/", (req, res) => {
  res.send("Hello from user");
});

/*
type: post
@route - /api/users/register
@desc - registration route
@access - public
*/

router.post("/register", (req, res) => {
  // res.json({ message: "Register api" });
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          profilepic: req.body.profilepic
        });

        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log("Registration error"));
      } else {
        res.json({ message: "User has been foun" });
      }
    })
    .catch(err => console.log("Database error"));
});

/*
@type - post
@route - /api/users/login
@desc - login route
@access - public
*/

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        if (user.password == req.body.password) {
          res.json({ message: "Login Sucess" });
        } else {
          res.json({ message: "Password wrong" });
        }
      } else {
        res.status(404).json({ message: "email id not found" });
      }
    })
    .catch(err => console.log("Login route error " + err));
});

module.exports = router;
