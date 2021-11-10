import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CreateQuizPage from "./components/CreateQuizPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createquiz" element={<CreateQuizPage />} />
      </Routes>
    </div>
  );
}

export default App;
