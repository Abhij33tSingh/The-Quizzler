import { useNavigate } from "react-router-dom";
//import AttemptQuiz from "./AttemptQuiz";
const SelectQuiz = (props) => {
  const navigate = useNavigate();
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

      <button className="AttemptButton" onClick={attempt}>
        Attempt Quiz
      </button>
    </div>
  );
};

export default SelectQuiz;
