import React from "react";
import { useEffect, useState, Fragment } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";

function HomePage(props) {
  const isLoggedIn = props.loggedIn;

  const [name, setName] = useState("");
  const [allQuizzes, setAllQuizzes] = useState({});

  const params = useParams();

  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + params.id).then((response) => {
      setName(response.data.name);
      //WE ARE GETTING ALL OF OUR USER DATA IN response.data
    });

    Axios.get("http://localhost:3001/getAllQuizzes").then((response) => {
      setAllQuizzes(response.data);

      //WE ARE GETTING ALL OF OUR QUIZZES IN response
    });
  }, []);

  if (isLoggedIn) {
    return (
      <Fragment>
        <header>
          <h1>Quizzler</h1>
          <ul className="navbarItems">
            <li>Create a Quiz</li>
            <li>About us</li>
            <li>Take a Quiz</li>
            <li>
              <Link to="/userProfile/" />
              {name}
            </li>
          </ul>

          <div className="Signup">
            <button>Sign Up</button>
          </div>
        </header>
        <div>{console.log(allQuizzes)}</div>
      </Fragment>
    );
  }
  // navigate("/login");   NAVIGATE IS NOT WORKING!??
}

export default HomePage;
