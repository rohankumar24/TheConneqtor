const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

const Profile = require("../../models/Profile");

// /*
// @route - /
// @desc - Profile test route
// @access - public
// */
// router.get("/", (req, res) => {
//   res.json({ message: "Profile Sucess" });
// });

/*
@route - /
@desc - Profile getting route
@access - private
@type - POST
*/

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profilevalues = {};

    profilevalues.user = req.user.id;
    if (req.body.name) profilevalues.name = req.body.name;
    if (req.body.email) profilevalues.email = req.body.email;
    if (req.body.username) profilevalues.username = req.body.username;
    if (req.body.website) profilevalues.website = req.body.website;
    profilevalues.socialhandles = {};
    if (req.body.facebook)
      profilevalues.socialhandles.facebook = req.body.facebook;
    if (req.body.twitter)
      profilevalues.socialhandles.twitter = req.body.twitter;
    if (req.body.linkedin)
      profilevalues.socialhandles.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profilevalues },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => console.log("profile error " + err));
        } else {
          const newProfile = new Profile(profilevalues);
          newProfile
            .save()
            .then(profile => res.json(profile))
            .catch(err => console.log(err + "Profile Error"));
        }
      })
      .catch(err => console.log("profile post error " + err));
  }
);

module.exports = router;
