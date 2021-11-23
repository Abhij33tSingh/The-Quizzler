import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import QuizDetail from "./QuizDetail";
import userIcons from "../Images/gamer.png";

const ListOfQuizzes = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [quizzesCreated, setQuizzesCreated] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + params.userId).then(
      (response) => {
        setQuizzesCreated(response.data.quizzesCreated);
        setUserData(response.data);
      }
    );
  }, [params.userId]);

  return (
    <div>
      <header>
        <h1 onClick={() => navigate("/homepage/" + params.userId)}>Quizzler</h1>

        <div className="ProfilenavbarItems">
          <nav onClick={() => navigate("/createquiz/" + params.userId)}>
            Create a Quiz
          </nav>
          <nav onClick={() => navigate("/AboutUs/" + params.userId)}>
            About us
          </nav>
          <nav onClick={() => navigate("/homepage/" + params.userId)}>
            Start Quiz
          </nav>
          <nav onClick={() => navigate("/profile/" + params.userId)}>
            {userData.name}
          </nav>
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
        <div className="QuizListBody">
          <h2>These are the Quizzes you have created</h2>
          {quizzesCreated.map((quizId) => {
            return (
              <div className="QuizList">
                <div className="QuizListItems">
                  {<QuizDetail quizId={quizId} />}
                </div>
                <button
                  onClick={() => {
                    navigate(
                      "/AttempterResults/" +
                        quizId +
                        "/" +
                        params.userId +
                        "/" +
                        params.userId
                    );
                  }}
                >
                  {" "}
                  click me{" "}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListOfQuizzes;
