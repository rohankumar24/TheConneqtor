const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../../models/User");

/*
@route - /api/users/
@desc - simple testing route
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
TODO:

    Implement Login Route

 */

router.get("/", (req, res) => {
  res.send("Hello from user");
});

module.exports = router;
