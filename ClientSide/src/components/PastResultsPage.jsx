import { useParams,useNavigate } from "react-router-dom";
import { Component, useEffect,useState} from "react";
import Axios from "axios";
import QuizDetail from "./QuizDetail";

const PastResultsPage = () => {
  const params = useParams();
  const [userData,setData] = useState([]);
  const [quiz,setquiz] = useState([]);
  const [quizz,setquizz] = useState([]);
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
  var u = 0;
  const getQuiz = (quizId)=>{
    Axios.get("http://localhost:3001/getAllQuizzes").then((response)=>
        {
          for (let i = 0; i < response.data.length; i++)
          {
            if(quizId === response.data[i]._id)
            {
                  setquiz([response.data[i].title])
                  console.log(response.data[i].title)
                  
                  break;
            }
          }
        }
        )
       return(quiz)       
  }
  const getQuizz = ()=>{
    if(userData.quizzesCompleted){
    userData.quizzesCompleted.map((q,key)=>{
      setquizz([...quizz,getQuiz(q.quizId)])
    })
  }
  }
  //useEffect(getQuizz,[])
  
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
        {userData.quizzesCompleted.map((q,key)=><div key = {key}> {key+1})  {<QuizDetail quizId={q.quizId}/>}       ({q.marksScored})
        </div>)}
        <div>
          {
            console.log(quizz)
          }
        </div>
        
       </div>)}

        </div>
    </div>
  );
};

export default PastResultsPage;
