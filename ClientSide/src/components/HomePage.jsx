import React from "react";
var year = new Date();
year = year.getFullYear();
function HomePage() {
  return (
    <div className="homePage">
      <header>
        <h1>Quizzler</h1>

        <ul className="navbarItems">
          <li>Create a Quiz</li>
          <li>About us</li>
          <li>Start Quiz</li>
        </ul>
        <div>
          <button>Sign Up</button>
        </div>
      </header>
      <div className="HomeBody">
        <div className="LoginButtonContainer">
          <button>Login</button>
        </div>
      </div>
      <footer>
        <p> Copyright© {year} </p>{" "}
      </footer>
    </div>
  );
}

export default HomePage;
