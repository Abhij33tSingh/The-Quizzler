const mongoose = require("mongoose");
const quizModel = require("./models/quiz");

mongoose.connect(
  "mongodb+srv://Abhijeet:QuizzlerPassword@quizzlercluster.wbmhf.mongodb.net/quizzler?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

quizModel.deleteMany({}).then(() => {
  console.log("Deleted All");
});
