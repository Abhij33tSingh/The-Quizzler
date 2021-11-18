const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./models/users");
const quizModel = require("./models/quiz");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://Abhijeet:QuizzlerPassword@quizzlercluster.wbmhf.mongodb.net/quizzler?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.post("/addUser", async (req, res) => {
  const { name, email, password } = req.body;

  const user = new userModel({
    name: name,
    email: email,
    password: password,
  });

  try {
    await user.save();
    res.send("Inserted Successfully");
  } catch (err) {
    console.log(err);
  }
});

app.get("/readUser", async (req, res) => {
  userModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.post("/postQuiz", async (req, res) => {
  const { title, description, t, allQuestions } = req.body;

  const quiz = new quizModel({
    title: title,
    description: description,
    t: t,
    allQuestions: allQuestions,
  });

  try {
    await quiz.save();
    res.send("Inserted Successfully");
  } catch (err) {
    res.send(err);
  }
});

app.get("/getQuiz/:id", async (req, res) => {
  const { id } = req.params;
  const reqQuiz = await quizModel.findById(id);
  res.send(reqQuiz);
});

app.get("/getAllQuizzes", async (req, res) => {
  quizModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.get("/getUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reqUser = await userModel.findById(id);
    res.send(reqUser);
  } catch (err) {
    res.send(err);
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
