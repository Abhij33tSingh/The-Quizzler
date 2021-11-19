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
                <td className = "test">
                    {
                        props.q.title
                    }
                </td>
                <td className = "test">
                    {
                        props.q.description
                    }
                </td>
                <td className = "test">
                    <button onClick = {attempt}>
                        Attempt Quiz
                    </button>
                </td>
            </tbody>
        </div>
    )

}

export default SelectQuiz;