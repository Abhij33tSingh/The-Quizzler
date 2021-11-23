import { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const ListOfQuizzes = () => {
  const params = useParams();
  const [quizzesCreated, setQuizzesCreated] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + params.userId).then(
      (response) => {
        console.log(response.data.quizzesCreated);
        setQuizzesCreated(response.data.quizzesCreated);
      }
    );
  }, []);

  return (
    <div>
      List of All Quizzes Created by this user. EACH title should be a link to
      "/attempterResults/:quizId/:hostId"
    </div>
  );
};

export default ListOfQuizzes;
