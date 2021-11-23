import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SelectQuiz from "./SelectQuiz";

var year = new Date();
year = year.getFullYear();

function HomePage(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(props.loggedIn);

  // const id = props.id;
  const [name, setName] = useState("");
  const [allQuizzes, setAllQuizzes] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + params.id).then(
      (response) => {
        setName(response.data.name);
      }
      //WE ARE GETTING ALL OF OUR USER DATA IN response.data
    );

    Axios.get("http://localhost:3001/getAllQuizzes").then((response) => {
      setAllQuizzes(response.data);

      //WE ARE GETTING ALL OF OUR QUIZZES IN response
    });

    if (params.id == undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);
  const q = Object.values(allQuizzes);
  if (true) {
    return (
      <div>
        <header>
          <h1 onMouseDown={() => navigate("/homepage/" + params.id)}>
            Quizzler
          </h1>
          <div className="navbarItems">
            <nav onClick={() => navigate("/createquiz/" + params.id)}>
              Create a Quiz
            </nav>
            <nav onClick={() => navigate("/AboutUs/" + params.id)}>
              About us
            </nav>

            <nav
              className="UserName"
              onMouseDown={() => {
                navigate("/profile/" + params.id);
              }}
            >
              {name}
            </nav>
            {/* <nav>
              {!isLoggedIn && (
                <div className="Signup">
                  <button
                    onClick={() => {
                      return <div> {navigate("/register")}</div>;
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </nav> */}
          </div>
        </header>
        <div className="HomePage">
          <div>{console.log(q)}</div>
          <div className="QuizContent">
            {q.map((q, key) => {
              return (
                <div>
                  <SelectQuiz
                    key={key}
                    q={q}
                    isLoggedIn={isLoggedIn}
                    id={params.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <footer>
          <p> Copyright© {year} </p>{" "}
        </footer>
      </div>
    );
  }
  // navigate("/login"); NAVIGATE IS NOT WORKING!??
}

export default HomePage;
