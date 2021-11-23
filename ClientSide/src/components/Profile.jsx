import React from "react";
import userIcons from "../Images/gamer.png";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

var year = new Date();
year = year.getFullYear();

function Profile() {
  const params = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + params.id).then((response) => {
      setUserData(response.data);
      console.log(response.data);
    });
  }, [params.id]);

  return (
    <div>
      <header>
        <h1 onClick={() => navigate("/homepage/" + params.id)}>Quizzler</h1>

        <div className="ProfilenavbarItems">
          <nav onClick={() => navigate("/createquiz/" + params.id)}>
            Create a Quiz
          </nav>
          <nav onClick={() => navigate("/AboutUs/" + params.id)}>About us</nav>
          <nav onClick={() => navigate("/homepage/" + params.id)}>
            Start Quiz
          </nav>
          <nav>{userData.name}</nav>
        </div>
      </header>
      <div className="profilePage">
        <div className="IntroSection">
          <img className="UserImage" src={userIcons} alt="user icon" />
          <div>
            <h1 className="Greetings">Hello {userData.name}</h1>
            <div className="UserDetails">
              {userData.quizzesCompleted && (
                <div>
                  <p>
                    Quiz Attempted:{" "}
                    <span className="NumOfQuizAttempted">
                      {" "}
                      {userData.quizzesCompleted.length}
                    </span>
                  </p>
                  <p>
                    Quiz Created:{" "}
                    {userData.quizzesCreated && (
                      <span className="NumOfQuizCreated">
                        {" "}
                        {userData.quizzesCreated.length}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="ResultsContainer">
          <div className="HostResult">
            <h1>Results of your Quizzes</h1>
            <p>To check the results of the quizzes you created </p>
            <button
              type="button"
              onMouseDown={() => {
                navigate("/listOfAllQuizzes/" + userData._id);
              }}
            >
              Click Here
            </button>
          </div>
          <div className="QuizAttemptedResult">
            <h1>Your Past Results</h1>
            <p>To check the results of the quizzes you attempted </p>
            <button
              type="button"
              onMouseDown={() => {
                navigate("/pastResults/" + userData._id);
              }}
            >
              Click Here
            </button>
          </div>
        </div>
      </div>
      <footer>
        <p> Copyright© {year} </p>{" "}
      </footer>
    </div>
  );
}

export default Profile;
