import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const ListOfQuizzes = () => {
  const params = useParams();
  const [quizzesCreated, setQuizzesCreated] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + params.userId).then(
      (response) => {
        setQuizzesCreated(response.data.quizzesCreated);
      }
    );
  }, []);

  let getQuizDetails = async (quizId) => {
    let quizDetails = await Axios.get(
      "http://localhost:3001/getQuiz/" + quizId
    );
    return quizDetails;
  };

  return (
    <div>
      List of All Quizzes Created by this user. EACH title should be a link to
      "/attempterResults/:quizId/:hostId"
      <br />
      {quizzesCreated.map(async (data) => {
        let quiz = await getQuizDetails(data);
        {
          console.log(quiz);
        }
        return <div>{quiz.data.title}</div>;
      })}
    </div>
  );
};

export default ListOfQuizzes;
