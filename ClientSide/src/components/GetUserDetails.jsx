import { useState, useEffect } from "react";
import Axios from "axios";

const GetUserDetails = (props) => {
  const [name, setName] = useState([]);
  const [score, setScore] = useState([]);
  const [quizLength, setQuizLength] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await Axios.get("http://localhost:3001/getUser/" + props.userId).then(
      (response) => {
        setName(response.data.name);

        for (let i = 0; i < response.data.quizzesCompleted.length; i++) {
          if (response.data.quizzesCompleted[i].quizId === props.quizId) {
            setScore(response.data.quizzesCompleted[i].marksScored);
          }
        }
      }
    );
    await Axios.get("http://localhost:3001/getAllQuizzes").then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (props.quizId === response.data[i]._id) {
          setQuizLength([response.data[i].allQuestions.length]);
          break;
        }
      }
    });
  }, [props.quizId, props.userId]);

  return (
    <div className="AttempterResults">
      <span className="attempterName">{name} Scored</span>
      <span className="score">{score}</span>
      <span>
        {" "}
        / {quizLength} <br />
      </span>
    </div>
  );
};

export default GetUserDetails;
