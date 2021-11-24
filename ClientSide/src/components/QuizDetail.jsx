import { useEffect, useState } from "react";
import Axios from "axios";

const QuizDetail = (props) => {
  const [quiz, setQuiz] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/getQuiz/" + props.quizId).then(
      (response) => {
        setQuiz([response.data.title]);
      }
    );
  }, []);

  return <span> {quiz} </span>;
};
export default QuizDetail;
