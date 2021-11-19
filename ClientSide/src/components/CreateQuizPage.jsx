import AddQuestion from "./AddQuestion";
import { useState } from "react";
import useBasicInput from "../hooks/usebasic-input";
import React from "react";
import Axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

const CreateQuizPage = () => {
  const navigate = useNavigate();
  const params = useParams();
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
          return;
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
    <h1 onMouseDown={()=> navigate("/homepage/")}>
      Quizzler
    </h1>
    <ul className="navbarItems">
      <li onClick={ ()=>{
            return(
            <div>
              {navigate("/homepage/" + params.id)
              //console.log(props.q.allQuestions)
              }
            </div>
            )
            }
            }>Give Quiz</li>
      <li>About us</li>
      <li>
        {<div className="Signup">
          <button onClick={ ()=>{
            return(
            <div>
              {navigate("/register")
              //console.log(props.q.allQuestions)
              }
            </div>
            )
            }
            }>
            Sign Up
          </button>

        </div>}
      </li>
    </ul>
  </header>
  <div className="Container">
      <h2>Create Quiz</h2>
      <form onSubmit={submissionHandler}>
        <div className={`form-control ${titleInputClasses}`}>
          <label className = "label">Quiz Title</label>
          <input
            type="text"
            value={title}
            onBlur={titleBlurHandler}
            onChange={titleChangeHandler}
          />
        </div>
        <div className={`form-control ${DescriptionInputClasses}`}>
          <label className = "label">Quiz Description</label>
          <input
          className ="Input"
            type="text-area"
            value={Description}
            onBlur={DescriptionBlurHandler}
            onChange={DescriptionChangeHandler}
          />
        </div>
        <div className={`form-control`} onClick={Quiztype}>
          <label className = "label">private</label>
          <input type="radio" name="quiz-type" value="private" />
          <label className = "label">public</label>
          <input type="radio" name="quiz-type" value="public" checked />
        </div>
        <div className={`form-control`}>
          <section>
            {Array.from({ length: n }, (_, i) => (
              <div>
                <hr></hr>
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
