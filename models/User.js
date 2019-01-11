const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilpic: {
    type: String,
    required: true,
    default:
      "http://profilepicturesdp.com/wp-content/uploads/2018/07/pictures-for-tumblr-profile-pic-1.png"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("User", UserSchema);
