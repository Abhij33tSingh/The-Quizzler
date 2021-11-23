// eslint-disable-next-line

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
// import Body from "./AboutUsBody"

function AboutUs() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const Params = useParams();

  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + Params.id).then((response) => {
      setUserData(response.data);
    });
  }, [Params.id]);

  return (
    <div>
      <header>
        <h1 onMouseDown={() => navigate("/homepage/" + Params.id)}>Quizzler</h1>
        <div className="navbarItems">
          <nav onClick={() => navigate("/createquiz/" + Params.id)}>
            Create a Quiz
          </nav>
          <nav
            onClick={() => {
              return (
                <div>
                  {
                    navigate("/homepage/" + Params.id)
                    //console.log(props.q.allQuestions)
                  }
                </div>
              );
            }}
          >
            Attempt a Quiz
          </nav>
          <nav
            className="UserName"
            onMouseDown={() => {
              navigate("/profile/" + Params.id);
            }}
          >
            {userData.name}
          </nav>
        </div>
      </header>
      <div className="AboutUsBody">
        <div className="AboutQuizzler">
          <h1>About Quizzler</h1>
          <p>
            Quizzler is a React-based web application developed using MERN Stack
            technology. The main goal behind Quizzler is to provide an efficient
            and user-friendly way for trivia hosting. As we know, Quizzler is
            developed using MERN Stack for ReactJS is used for frontend with a
            little bit of HTML and CSS, and for the backend, we used MongoDB for
            Database Design and NodeJS with ExpressJS framework for the backend
            of our project. The web application achieved is capable of making
            quiz hosting easy and simple to host and evaluate. It will provide a
            detailed result for the candidate to see his/her mistakes. In the
            future, we will try to add some more features that will enhance our
            users' user experience.
          </p>
        </div>
      </div>
      {/* <Body /> */}
    </div>
  );
}

export default AboutUs;
