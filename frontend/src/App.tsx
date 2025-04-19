import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizList from "./pages/questions";
import QuizResult from "./pages/quizResult";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<QuizList />} />
        <Route path="/result" element={<QuizResult />} />
      </Routes>
    </Router>
  );
};

export default App;



