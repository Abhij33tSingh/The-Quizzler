import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";

const PastResultsPage = () => {
  const params = useParams();

  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + params.id).then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      This is the Past Results Page, Look at console and access data that you
      need!
    </div>
  );
};

export default PastResultsPage;
