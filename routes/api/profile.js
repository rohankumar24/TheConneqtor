const express = require("express");

const router = express.Router();
/*
@route - /
@desc - Profile test route
@access - public
*/

router.get("/", (req, res) => {
  res.json({ message: "Profile Sucess" });
});

module.exports = router;
