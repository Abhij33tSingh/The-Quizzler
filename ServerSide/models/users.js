const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  attemptedQuiz: { type: [String] },
  noOfQuizzesAttempted: { type: Number },
  totalMarks: { type: Number },
});

module.exports = mongoose.model("User", UserSchema);
