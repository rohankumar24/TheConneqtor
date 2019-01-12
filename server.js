const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

const URL = require("./config/creds").mongoURL;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

mongoose
  .connect(
    URL,
    { useNewUrlParser: true }
  )
  .then(database => {
    console.log("Database Connected Successfully");
  })
  .catch(err => {
    console.log("Database Connection Error");
  });

const user = require("./routes/api/users");
const profile = require("./routes/api/profile");

app.use("/api/profile", profile);
app.use("/api/users", user);

app.get("/", (req, res) => {
  res.send("Welcome to TheConneqtor");
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
