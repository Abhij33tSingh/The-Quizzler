//import { useParams,useNavigate } from "react-router-dom";
import { useEffect,useState} from "react";
import Axios from "axios";

const QuizDetail = (props) =>{

    const [quiz,setQuiz] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3001/getAllQuizzes").then((response) =>{
            for (let i = 0; i < response.data.length; i++)
            {
              if(props.quizId === response.data[i]._id)
              {
                    setQuiz([response.data[i].title])
                    break;
              }
            }
          }
          );
      }, []);

    return (
        <span> {quiz} </span>
            
    )
}
export default QuizDetail