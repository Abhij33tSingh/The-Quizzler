import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import GetUserDetails from "./GetUserDetails";
import userIcons from "../Images/gamer.png";

const AttempterResults = () => {
  const navigate = useNavigate();
  const [attempterIDs, setAttempterIDs] = useState([]);
  const [userData, setUserData] = useState([]);
  const params = useParams();
  useEffect(() => {
    Axios.get("http://localhost:3001/getQuiz/" + params.quizId).then(
      (response) => {
        setAttempterIDs(response.data.attempterIDs);
      }
    );
    Axios.get("http://localhost:3001/getUser/" + params.hostId).then(
      (response) => {
        setUserData(response.data);
      }
    );
  }, [params.hostId, params.quizId]);

  let viewing = () => {
    if (params.viewerId === params.hostId) {
      return (
        <div>
          This page is being viewed by host.
          <br />
          WORK IN PROGRESS
        </div>
      );
    } else {
      return (
        <div>
          You are only allowed to check scores of quizzes that you have hosted.
        </div>
      );
    }
  };

  return (
    <div>
      {/* {viewing()} */}
      <header>
        <h1 onClick={() => navigate("/homepage/" + params.viewerId)}>
          Quizzler
        </h1>

        <div className="ProfilenavbarItems">
          <nav onClick={() => navigate("/createquiz/" + params.viewerId)}>
            Create a Quiz
          </nav>
          <nav onClick={() => navigate("/AboutUs/" + params.viewerId)}>
            About us
          </nav>
          <nav onClick={() => navigate("/homepage/" + params.viewerId)}>
            Start Quiz
          </nav>
          <nav onClick={() => navigate("/profile/" + params.viewerId)}>
            {userData.name}
          </nav>
        </div>
      </header>
      <div className="profilePage">
        <div className="IntroSection">
          <img className="UserImage" src={userIcons} alt="user icon" />
          <div>
            <h1 className="Greetings">Hello {userData.name}</h1>
          </div>
        </div>
        <div className="ResultOfAttempter">
          {attempterIDs.map((attempterID) => {
            return (
              <GetUserDetails userId={attempterID} quizId={params.quizId} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttempterResults;
