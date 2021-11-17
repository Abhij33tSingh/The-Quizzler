import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

function HomePage(props) {
  const navigate = useNavigate();
  const isLoggedIn = props.loggedIn;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const params = useParams();

  useEffect(() => {
    Axios.get("http://localhost:3001/getUser/" + params.id).then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      // let email = response.data.email;  //WE ARE GETTING ALL OF OUR USER DATA IN response.data
    });
  }, []);

  if (isLoggedIn) {
    return (
      <header>
        <h1>Quizzler</h1>
        <ul className="navbarItems">
          <li>Create a Quiz</li>
          <li>About us</li>
          <li>Take a Quiz</li>
          <li>
            <Link to="/userProfile/" />
            {name}
          </li>
        </ul>

        <div className="Signup">
          <button>Sign Up</button>
        </div>
      </header>
    );
  }
  // navigate("/login");   NAVIGATE IS NOT WORKING!??
}

export default HomePage;
