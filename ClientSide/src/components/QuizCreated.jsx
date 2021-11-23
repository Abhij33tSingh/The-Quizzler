import { useEffect,useState } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const QuizCreated = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [quiz,setQuiz] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/getQuiz/" + params.id).then((response) => {
      //console.log(response);
      setQuiz(response.data);
    });
  }, []);

  return (
    <div>
      <header>
        <h1 onClick={() => navigate("/homepage/" + quiz.userId)}>Quizzler</h1>

        <div className="ProfilenavbarItems">
          <nav onClick={() => navigate("/createquiz/" + quiz.userId)}>
            Create a Quiz
          </nav>
          <nav onClick={() => navigate("/AboutUs/" + quiz.userId)}>About us</nav>
        </div>
      </header>
      <div>
      
      <div className="QuizContent">
      <h1>Success!!! Quiz Created</h1>
        { quiz.allQuestions &&

          (<table id="Results">
            <tbody>
                  <tr>
                  <td>
                      <h3>s/no</h3>
                  </td>
                  <td>
                      <h3>Question</h3>
                  </td>
                  <td>
                      <h3>Answer</h3>
                  </td>
                  <td>Options</td>
                  </tr>
            {quiz.allQuestions.map((q,key)=>
              <tr key={key}>
                <td>{key + 1}</td>
              <td>{q.Question}</td>
              <td>{q.Answer}</td>
              <td>{q.option1},{q.option2},{q.option3},{q.option4}</td>
            </tr>)}
          </tbody>
          </table>)
        }
        <button 
        onClick={()=>{
          navigate("/homepage/" + quiz.userId)
        }}
        >Go To Home</button>
        </div>
      </div>
    </div>
  );
};

export default QuizCreated;
