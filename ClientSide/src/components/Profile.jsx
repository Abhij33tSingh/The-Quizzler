import React from "react";
import userIcons from "../Images/gamer.png";

function Profile() {
  return (
    <div className="profilePage">
      <header>
        <h1>Quizzler</h1>

        <ul className="navbarItems">
          <li>Create a Quiz</li>
          <li>About us</li>
          <li>Start Quiz</li>
          <li>User's Name</li>
        </ul>
      </header>
      <div className="IntroSection">
        <img className="UserImage" src={userIcons} alt="user icon" />
        <div>
          <h1 className="Greetings">Hello User's Name</h1>
          <div className="UserDetails">
            <p>
              Quiz Attempted: <span className="NumOfQuizAttempted">0</span>
            </p>
            <p>
              Quiz Created: <span className="NumOfQuizCreated">0</span>
            </p>
          </div>
        </div>
      </div>
      <div className="ResultsContainer">
        <div className="HostResult">
          <h1>Results of your Quizzes</h1>
          <p>To check the results of the quizzes you created </p>
          <button type="button">Click Here</button>
        </div>
        <div className="QuizAttemptedResult">
          <h1>Your Past Results</h1>
          <p>To check the results of the quizzes you attempted </p>
          <button type="button">Click Here</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
