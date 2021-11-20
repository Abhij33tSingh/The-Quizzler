import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

const PastResultsPage = () => {
  const params = useParams();

  return (
    <div>
      This is the Past Results Page, Look at console and access data that you
      need!
    </div>
  );
};

export default PastResultsPage;
