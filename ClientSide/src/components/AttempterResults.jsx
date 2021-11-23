import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import GetUserDetails from "./GetUserDetails";

const AttempterResults = () => {
  const [attempterIDs, setAttempterIDs] = useState([]);
  const params = useParams();
  useEffect(() => {
    Axios.get("http://localhost:3001/getQuiz/" + params.quizId).then(
      (response) => {
        setAttempterIDs(response.data.attempterIDs);
      }
    );
  }, []);

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
      {viewing()}
      <div>
        {attempterIDs.map((attempterID) => {
          return <GetUserDetails userId={attempterID} quizId={params.quizId} />;
        })}
      </div>
    </div>
  );
};

export default AttempterResults;
