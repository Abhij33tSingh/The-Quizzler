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
  const [viewerData, setViewerData] = useState([]);
  let areSame = params.id === params.viewerId ? true : false;
  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + params.id).then((response) => {
      setUserData(response.data);
    });

    Axios.get("http://localhost:3001/getUser/" + params.viewerId).then(
      (response) => {
        console.log(response.data);
        setViewerData(response.data);
      }
    );
  }, []);
  const data = Object.values(userData);

  return (
    <div>
      <header>
        <h1 onClick={() => navigate("/homepage/" + params.viewerId)}>
          Quizzler
        </h1>

        <div className="ProfilenavbarItems">
          <nav onClick={() => navigate("/createquiz/" + params.id)}>
            Create a Quiz
          </nav>
          <nav onClick={() => navigate("/AboutUs/" + params.id)}>About us</nav>
          <nav onClick={() => navigate("/homepage/" + params.id)}>
            Select Quiz
          </nav>
          <nav>{viewerData.name}</nav>
        </div>
      </header>
      <div className="profilePage">
        <div className="IntroSection">
          <img className="UserImage" src={userIcons} alt="user icon" />
          <div>
            <h1 className="Greetings">{userData.name}</h1>
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
            {areSame && <h1>Results of your Quizzes</h1>}
            {areSame && <p>To check the results of the quizzes you created </p>}
            {!areSame && <h1>List Of Quizzes</h1>}
            {!areSame && (
              <p>To check list of quizzes created by {userData.name}</p>
            )}

            <button
              type="button"
              onMouseDown={() => {
                navigate(
                  "/listOfAllQuizzes/" + userData._id + "/" + viewerData._id
                );
              }}
            >
              Click Here
            </button>
          </div>
          {areSame && (
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
          )}
        </div>
      </div>
      <footer>
        <p> Copyright© {year} </p>{" "}
      </footer>
    </div>
  );
}

export default Profile;
