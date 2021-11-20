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
      <p className="test">{props.q.title}</p>
      <p className="test">{props.q.description}</p>

      <button className="Attempt Button" onClick={attempt}>
        Attempt Quiz
      </button>
    </div>
  );
};

export default SelectQuiz;
