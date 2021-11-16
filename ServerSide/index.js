const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./models/users");
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

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
