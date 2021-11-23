import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import QuizDetail from "./QuizDetail";

const PastResultsPage = () => {
  const params = useParams();
  const [userData, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + params.id).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <header>
        <h1 onClick={() => navigate("/homepage/" + params.id)}>Quizzler</h1>

        <div className="ProfilenavbarItems">
          <nav onClick={() => navigate("/createquiz/" + params.id)}>
            Create a Quiz
          </nav>
          <nav onClick={() => navigate("/AboutUs/" + params.id)}>About us</nav>
          <nav>Start Quiz</nav>
          <nav onClick={() => navigate("/Profile/" + params.id)}>
            {userData.name}
          </nav>
        </div>
      </header>
      <div className="QuizContent">
        {userData.quizzesCompleted && (
          <div>
            <h1 id="title">Past Results</h1>
            <table id="Results">
              <tbody>
                <tr>
                  <td>
                    <h3>s/no</h3>
                  </td>
                  <td>
                    <h3>Quiz Title</h3>
                  </td>
                  <td>
                    <h3>score</h3>
                  </td>
                </tr>
                {userData.quizzesCompleted.map((q, key) => (
                  <tr key={key}>
                    <td> {key + 1}</td>
                    <td>{<QuizDetail quizId={q.quizId} />}</td>
                    <td>
                      ({q.marksScored})/{<QuizMarks quizId={q.quizId} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
const QuizMarks = (props) => {
  const [quiz, setQuiz] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/getAllQuizzes").then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (props.quizId === response.data[i]._id) {
          setQuiz([response.data[i].allQuestions.length]);
          break;
        }
      }
    });
  }, [props.quizId]);

  return <span> {quiz} </span>;
};
export default PastResultsPage;
