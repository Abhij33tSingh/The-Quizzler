import { useState, useEffect } from "react";
import Axios from "axios";

const GetUserDetails = (props) => {
  const [name, setName] = useState([]);
  const [score, setScore] = useState([]);

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
  }, []);

  return (
    <span>
      {name} - {score}
      <br />
    </span>
  );
};

export default GetUserDetails;
