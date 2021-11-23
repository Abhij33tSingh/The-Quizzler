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
            {userData.quizzesCompleted.map((q, key) => (
              <div key={key}>
                {" "}
                {key + 1}) {<QuizDetail quizId={q.quizId} />} ({q.marksScored})
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PastResultsPage;
