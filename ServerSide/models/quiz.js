const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  description: String,
  title: String,
  t: String,
  userId: String,
  allQuestions: [
    {
      Answer: { type: String, required: true },
      Question: { type: String, required: true },
      option1: { type: String, required: true },
      option2: { type: String, required: true },
      option3: { type: String, required: true },
      option4: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
