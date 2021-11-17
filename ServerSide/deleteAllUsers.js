const mongoose = require("mongoose");
const userModel = require("./models/users");

mongoose.connect(
  "mongodb+srv://Abhijeet:QuizzlerPassword@quizzlercluster.wbmhf.mongodb.net/quizzler?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

userModel.deleteMany({}).then(() => {
  console.log("Deleted All");
});
