import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SelectQuiz from "./SelectQuiz";

var year = new Date();
year = year.getFullYear();

function HomePage(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(props.loggedIn);
  let i = 0;

  // const id = props.id;
  const [name, setName] = useState("");
  const [allQuizzes, setAllQuizzes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
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

    i = 0;
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
                navigate("/profile/" + params.id + "/" + params.id);
              }}
            >
              {name}
            </nav>
          </div>
        </header>
        <div className="searchbarContainer">
        <input className="Searchbar"
          type="text"
          placeholder="Search Quiz"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        </div>
        <div className="HomePage">
          <div className="QuizContent">
            {q
              .filter((q) => {
                if (searchTerm == "") {
                  return q;
                } else if (
                  q.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return q;
                }
              })
              .map((q, key) => {
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
                i++;
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
