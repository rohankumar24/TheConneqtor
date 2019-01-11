const express = require("express");

const router = express.Router();

/*
@route - /api/users/hello
@desc - simple testing route
@access - public
*/

router.get("/hello", (req, res) => {
  res.send("Hello from router");
});

module.exports = router;
