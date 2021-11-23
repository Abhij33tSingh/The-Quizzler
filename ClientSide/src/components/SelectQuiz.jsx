import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

const SelectQuiz = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [creator, setCreator] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + props.q.userId).then(
      (response) => {
        setCreator(response.data.name);
      }
    );
  });

  const attempt = () => {
    return (
      <div>
        {
          navigate("/attempt/" + props.id + "/" + props.q._id)
          //console.log(props.q.allQuestions)
        }
      </div>
    );
  };
  return (
    <div className="QuizContainer">
      <h1 className="QuizTitle">{props.q.title}</h1>
      <p className="QuizDescription">{props.q.description}</p>
      <div
        onMouseDown={() => {
          navigate("/profile/" + props.q.userId + "/" + params.id);
        }}
      >
        Created By - {creator}
      </div>

      <button className="AttemptButton" onClick={attempt}>
        Attempt Quiz
      </button>
    </div>
  );
};

export default SelectQuiz;
