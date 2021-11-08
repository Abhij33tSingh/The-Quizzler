import { Route, Routes } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CreateQuizPage from "./components/CreateQuizPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createquiz" element={<CreateQuizPage />} />
      </Routes>
    </div>
  );
}

export default App;
