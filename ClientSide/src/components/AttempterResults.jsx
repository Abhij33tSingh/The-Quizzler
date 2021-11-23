import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const AttempterResults = () => {
  const params = useParams();

  useEffect(() => {
    Axios.get("http://localhost:3001/getQuiz/" + params.quizId).then(
      (response) => {
        console.log(response.data);
      }
    );
    Axios.get("http://localhost:3001/getUser/" + params.hostId).then(
      (response) => {
        console.log(response.data);
      }
    );
  }, []);

  return <div>Result of all the people who gave this quiz</div>;
};

export default AttempterResults;
