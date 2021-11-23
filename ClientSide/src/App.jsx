import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CreateQuizPage from "./components/CreateQuizPage";
import HomePage from "./components/HomePage";
import QuizCreated from "./components/QuizCreated";
import Profile from "./components/Profile";
import AttemptQuiz from "./components/AttemptQuiz";
import PastResultsPage from "./components/PastResultsPage";
import AttempterResults from "./components/AttempterResults";
import ListOfQuizzes from "./components/ListOfQuizzes";
import AboutUs from "./components/AboutUs";

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
        <Route path="/createquiz/:id" element={<CreateQuizPage />} />
        {/* id - userid */}
        <Route path="/quizCreated/:id" element={<QuizCreated />} />
        {/* id - quizId */}

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
          path="/attempt/:id/:id2" //id-UserId, id2-quizId
          element={<AttemptQuiz loggedIn={loggedIn} />}
        />

        <Route path="/pastResults/:id" element={<PastResultsPage />} />
        <Route
          path="/homepage/:id" //id - userId
          element={<HomePage loggedIn={loggedIn} setIsLoggedIn={setLoggedIn} />}
        />

        <Route path="/profile/:id/:viewerId" element={<Profile />} />

        <Route path="/listOfAllQuizzes/:userId" element={<ListOfQuizzes />} />
        <Route
          path="/attempterResults/:quizId/:hostId/:viewerId"
          element={<AttempterResults />}
        />

        <Route path="/AboutUs/:id" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
