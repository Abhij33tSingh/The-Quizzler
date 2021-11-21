import AddQuestion from "./AddQuestion";
import { useState, useEffect } from "react";
import useBasicInput from "../hooks/usebasic-input";
import React from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
//import QuestionCard from "./QuestionCard";

var year = new Date();
year = year.getFullYear();

const CreateQuizPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + params.id).then((response) => {
      setUserData(response.data);
    });
  }, []);
  const [allQutions, addques] = useState([]);
  var x = 0;
  var t = "public";
  let quizCreatedId = "";
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

  const submissionHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    await Axios.post("http://localhost:3001/postQuiz", {
      title: title,
      description: Description,
      t: t,
      allQuestions: allQutions,
      userId: userData._id,
    });

    await Axios.get("http://localhost:3001/getAllQuizzes").then((response) => {
      response.data.map((val) => {
        if (val.userId === userData._id && val.title === title) {
          quizCreatedId = val._id;
        }
      });
    });

    await Axios.post(
      "http://localhost:3001/updateUserQuizzesCreated/" + userData._id,
      {
        quizId: quizCreatedId,
      }
    );

    await Axios.get("http://localhost:3001/getAllQuizzes").then((response) => {
      response.data.map((data) => {
        if (data.description === Description && data.title === title) {
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
    DescriptionIsValid && titleIsValid && allQutions.length >= 1;

  return (
    <div>
      <header>
        <h1 onMouseDown={() => navigate("/homepage/" + params.id)}>Quizzler</h1>
        <ul className="navbarItems">
          <li
            onClick={() => {
              return (
                <div>
                  {
                    navigate("/homepage/" + params.id)
                    //console.log(props.q.allQuestions)
                  }
                </div>
              );
            }}
          >
            Attempt a Quiz
          </li>
          <li>About us</li>
          <li>{userData.name}</li>
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
              <div className="Quiztype">
                <div className="PrivateRadio">
                  <label>Private</label>
                  <input
                    className="RadioInput"
                    type="radio"
                    name="quiz-type"
                    value="private"
                  />
                </div>
                <div className="PublicRadio">
                  <label>Public</label>
                  <input
                    className="RadioInput"
                    type="radio"
                    name="quiz-type"
                    value="public"
                    checked
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`form-control`}>
            {allQutions.length >= 1 && (
              <div className="QuizInfoContainer">
                {allQutions.map((q, key) => (
                  <div>
                    Question {key + 1}) {q.Question}
                  </div>
                ))}
              </div>
            )}
            <section>
              {
                <div className="QuestionCard">
                  <strong>Question</strong>
                  <br></br>
                  <br></br>

                  <AddQuestion data={data} />
                </div>
              }
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
      <footer>
        <p> Copyright© {year} </p>{" "}
      </footer>
    </div>
  );
};

export default CreateQuizPage;
