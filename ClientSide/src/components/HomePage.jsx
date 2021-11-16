import React from "react";

function HomePage() {
  return (
    <header>
      <h1>Quizzler</h1>
      <ul className="navbarItems">
        <li>Create a Quiz</li>
        <li>About us</li>
        <li>Take a Quiz</li>
        <li>User Account when logged in</li>
      </ul>

      <div className="Signup">
        <button>Sign Up</button>
      </div>
    </header>
  );
}

export default HomePage;
