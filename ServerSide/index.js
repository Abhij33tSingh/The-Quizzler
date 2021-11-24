require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./models/users");
const quizModel = require("./models/quiz");
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const db_Url = process.env.db_Url;

mongoose.connect(db_Url, { useNewUrlParser: true });

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

app.post("/updateUserQuizzesCreated/:userId", async (req, res) => {
  const { userId } = req.params;
  const { quizId } = req.body;
  const reqUser = await userModel.findById(userId);
  reqUser.quizzesCreated.push(quizId);
  await reqUser.save();
  res.send(reqUser);
});

app.post("/updateUserQuizzesCompleted/:userId", async (req, res) => {
  const { userId } = req.params;
  const { quizId, marksScored } = req.body;
  try {
    const reqUser = await userModel.findById(userId);
    const reqQuiz = await quizModel.findById(quizId);
    reqQuiz.attempterIDs.push(userId);
    reqUser.quizzesCompleted.push({ quizId: quizId, marksScored: marksScored });
    await reqUser.save();
    await reqQuiz.save();
    res.send(reqUser);
  } catch (err) {
    res.send(err);
  }
});

app.post("/postQuiz", async (req, res) => {
  const { title, description, allQuestions, userId } = req.body;

  const quiz = new quizModel({
    title: title,
    description: description,
    userId: userId,
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
  try {
    const reqQuiz = await quizModel.findById(id);
    res.send(reqQuiz);
  } catch (err) {
    res.send(err);
  }
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

app.listen(port, () => {
  console.log(`erver running on port ${port}`);
});
