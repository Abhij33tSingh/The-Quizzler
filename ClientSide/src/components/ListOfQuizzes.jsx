import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import QuizDetail from "./QuizDetail";

const ListOfQuizzes = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [quizzesCreated, setQuizzesCreated] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + params.userId).then(
      (response) => {
        setQuizzesCreated(response.data.quizzesCreated);
      }
    );
  }, []);

  return (
    <div>
      Click on Quiz Name to see results of Attempters in that quiz
      {quizzesCreated.map((quizId) => {
        return (
          <div
            onMouseDown={() => {
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
            {<QuizDetail quizId={quizId} />}
          </div>
        );
      })}
    </div>
  );
};

export default ListOfQuizzes;
