import { useParams,useNavigate } from "react-router-dom";
import { useEffect,useState} from "react";
import Axios from "axios";

const YourQuizResults = () => {
  const params = useParams();
  const [userData,setData] = useState([]);
  const [quiz,setquiz] = useState([]);
  const navigate = useNavigate();
  var q = []
  

  useEffect(() => {
    Axios.get("http://localhost:3001/readUser/").then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (params.id === response.data[i]._id) 
      {setData(response.data[i]);
      console.log(response.data[i]);}
    }});
  }, []);
  const getQuiz = (quizId)=>{
    Axios.get("http://localhost:3001/getAllQuizzes").then((response)=>
        {
          for (let i = 0; i < response.data.length; i++)
          {
            if(quizId === response.data[i]._id)
            {
                  setquiz([...quiz,response.data[i].title])
                  q.push(response.data[i].title)
                  break;
            }
          }
        }
        )
  }
  
  return (
    <div>
      <header>
        <h1 onClick={() => navigate("/homepage/" + params.id)}>Quizzler</h1>

        <ul className="ProfilenavbarItems">
          <li onClick={() => navigate("/createquiz/" + params.id)}>
            Create a Quiz
          </li>
          <li>About us</li>
          <li>Start Quiz</li>
          <li>{userData.name}</li>
        </ul>
      </header>
      <div className="QuizContent">
      {userData.quizzesCompleted && 
      (<div>
        {userData.quizzesCompleted.map((q,key)=><div key = {key}> {key} {q.marksScored}  {getQuiz(q.quizId)} 
        </div>)}
        
       </div>)}

        </div>
    </div>
  );
};

export default YourQuizResults;
