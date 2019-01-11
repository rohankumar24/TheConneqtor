const express = require("express");
const mongoose = require("mongoose");

const app = express();

const URL = require("./config/creds").mongoURL;

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

app.use("/api/users", user);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
