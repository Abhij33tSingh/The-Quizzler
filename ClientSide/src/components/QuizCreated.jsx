import { useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const QuizCreated = () => {
  const params = useParams();

  useEffect(() => {
    Axios.get("http://localhost:3001/getQuiz/" + params.id).then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <div>
      This page shows the quiz user just created!(Look at the browser console)
    </div>
  );
};

export default QuizCreated;
