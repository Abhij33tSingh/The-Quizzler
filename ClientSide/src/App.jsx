import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CreateQuizPage from "./components/CreateQuizPage";
import HomePage from "./components/HomePage";
import QuizCreated from "./components/QuizCreated";
import Profile from "./components/Profile";
import AttemptQuiz from "./components/AttemptQuiz";
//import AttemptQuiz from "./components/AttemptQuiz";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/login" />} />
        <Route
          path="/login"
          element={<LoginPage setLoggedIn={setLoggedIn} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createquiz" element={<CreateQuizPage />} />
        <Route path="/quizCreated/:id" element={<QuizCreated />} />
        
        <Route
          exact
          path="/homepage"
          element={<Navigate replace to="/login" />}
        />
         <Route
          exact
          path="/attempt"
          element={<Navigate replace to="/login" />}
        />
        <Route
          path="/attempt/:id/:id2"
          element={<AttemptQuiz loggedIn={loggedIn} />}
        />
        <Route
          path="/homepage/:id"
          element={<HomePage loggedIn={loggedIn} />}
        />

        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
