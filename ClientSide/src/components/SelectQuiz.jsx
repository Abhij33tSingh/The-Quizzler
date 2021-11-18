import { useNavigate } from "react-router-dom";
//import AttemptQuiz from "./AttemptQuiz";
const SelectQuiz = (props) =>{
    const navigate = useNavigate();
    const attempt = () =>{
        return(
            <div>
                {navigate("/attempt/" + props.id +"/"+ props.q._id)
                //console.log(props.q.allQuestions)
                }
            </div>
        )
    }
    return (
        <div>
            <tbody>
                <td>
                    {
                        props.q.title
                    }
                </td>
                <td>
                    {
                        props.q.description
                    }
                </td>
                <td>
                    <button onClick = {attempt}>
                        Attempt Quiz
                    </button>
                </td>
            </tbody>
        </div>
    )

}

export default SelectQuiz;