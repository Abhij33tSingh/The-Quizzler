import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CreateQuizPage from "./components/CreateQuizPage";
import HomePage from "./components/HomePage";
import QuizCreated from "./components/QuizCreated";

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
          path="/homepage/:id"
          element={<HomePage loggedIn={loggedIn} />}
        />
      </Routes>
    </div>
  );
}

export default App;
