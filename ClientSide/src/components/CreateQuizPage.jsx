import AddQuestion from "./AddQuestion";
import { useState, useParams, useEffect } from "react";
import useBasicInput from "../hooks/usebasic-input";
import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQuizPage = () => {
  const navigate = useNavigate();

  // // const [userData, setUserData] = useState({});
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/getUser/" + params.id).then((response) => {
  //     console.log(response);
  //   });
  // }, []);

  const [allQutions, addques] = useState([]);
  const n = 2;
  var x = 0;
  var t = "public";
  const Quiztype = (e) => {
    t = e.target.value;
  };
  const data = (Q) => {
    const item = Q;
    addques([...allQutions, item]);
    x++;
    console.log(x);
    //console.log(allQutions);
  };
  const {
    value: title,
    valueChangeHandler: titleChangeHandler,
    valueIsValid: titleIsValid,
    onBlurHandler: titleBlurHandler,
    inputTouched: titleInputTouched,
    reset: titleReset,
  } = useBasicInput((value) => value.trim().length !== 0);

  const {
    value: Description,
    valueChangeHandler: DescriptionChangeHandler,
    valueIsValid: DescriptionIsValid,
    onBlurHandler: DescriptionBlurHandler,
    inputTouched: DescriptionInputTouched,
    reset: DescriptionReset,
  } = useBasicInput((value) => value.trim().length !== 0);

  const submissionHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    Axios.post("http://localhost:3001/postQuiz", {
      title: title,
      description: Description,
      t: t,
      allQuestions: allQutions,
    });

    Axios.get("http://localhost:3001/getAllQuizzes").then((response) => {
      response.data.map((data) => {
        if (data.description === Description && data.title === data.title) {
          navigate("/quizCreated/" + data._id);
        }
      });
    });

    DescriptionReset();
    titleReset();
    //console.log(des.quizDescription, des.quizTitle);
  };

  const DescriptionInputClasses =
    !DescriptionIsValid && DescriptionInputTouched ? "invalid" : "";
  const titleInputClasses = !titleIsValid && titleInputTouched ? "invalid" : "";
  const formIsValid =
    DescriptionIsValid && titleIsValid && allQutions.length === n;

  return (
    <div>
      <header>
        <h1>Quizzler</h1>

        <ul className="navbarItems">
          <li>Create a Quiz</li>
          <li>About us</li>
          <li>Start Quiz</li>
          <li>Hello</li>
        </ul>
      </header>
      <div className="CreateQuizPage">
        <form onSubmit={submissionHandler}>
          <div className="QuizInfoContainer">
            <div className={`form-control ${titleInputClasses}`}>
              <label className="quizTitle">Quiz Title</label>
              <br />
              <input
                type="textarea"
                value={title}
                onBlur={titleBlurHandler}
                onChange={titleChangeHandler}
                className="quizTitleInput"
              />
              <br />
            </div>
            <div className={`form-control ${DescriptionInputClasses}`}>
              <label className="quizDescription">Quiz Description</label>
              <br />
              <textarea
                value={Description}
                onBlur={DescriptionBlurHandler}
                onChange={DescriptionChangeHandler}
                className="quizDescriptionInput"
                rows="30"
                cols="70"
              />
              <br />
            </div>
            <div className={`form-control`} onClick={Quiztype}>
              <label>private</label>
              <input type="radio" name="quiz-type" value="private" />
              <label>public</label>
              <input type="radio" name="quiz-type" value="public" checked />
            </div>
          </div>
          <div className={`form-control`}>
            <section>
              {Array.from({ length: n }, (_, i) => (
                <div>
                  <strong>Question {i + 1}</strong>
                  <br></br>
                  <br></br>
                  <AddQuestion data={data} />
                  <br></br>
                  <hr></hr>
                </div>
              ))}
            </section>
          </div>
          <div>
            <button className="form-actions" type="submit" value="Create Quiz">
              {" "}
              Create Quiz !
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuizPage;
