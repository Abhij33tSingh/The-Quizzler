import React from "react";
import { useEffect, useState, Fragment } from "react";
import Axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import SelectQuiz from "./SelectQuiz";

var year = new Date();
year = year.getFullYear();

function HomePage(props) {
  const isLoggedIn = props.loggedIn;
  // const id = props.id;
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [allQuizzes, setAllQuizzes] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + params.id).then(
      (response) => {
        setName(response.data.name);
        setId(response.data.id);
      }
      //WE ARE GETTING ALL OF OUR USER DATA IN response.data
    );

    Axios.get("http://localhost:3001/getAllQuizzes").then((response) => {
      setAllQuizzes(response.data);

      //WE ARE GETTING ALL OF OUR QUIZZES IN response
    });
  }, []);
  const q = Object.values(allQuizzes);
  if (true) {
    return (
      <div>
        <header>
          <h1 onMouseDown={() => navigate("/homepage/" + params.id)}>
            Quizzler
          </h1>
          <ul className="navbarItems">
            <li
              onMouseDown={() => {
                navigate("/createquiz/" + params.id);
              }}
            >
              Create a Quiz
            </li>
            <li>About us</li>
            <li>Take a Quiz</li>
            <li></li>
          </ul>
          <nav
            className="UserName"
            onMouseDown={() => {
              navigate("/profile/" + params.id);
            }}
          >
            {name}
          </nav>
        </header>
        <div>{console.log(q)}</div>
        <div>
          {q.map((q, key) => {
            return (
              <div>
                <SelectQuiz q={q} isLoggedIn={isLoggedIn} id={params.id} />
              </div>
            );
          })}
        </div>
        <footer>
          <p> Copyright© {year} </p>{" "}
        </footer>
      </div>
    );
  }
  // navigate("/login");   NAVIGATE IS NOT WORKING!??
}

export default HomePage;
