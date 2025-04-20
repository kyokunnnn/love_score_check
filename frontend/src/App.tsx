import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizQuestion from "./pages/quizQuestion";
import QuizResult from "./pages/quizResult";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/quiz/:id" element={<QuizQuestion />} />
        <Route path="/quiz/result" element={<QuizResult />} />
      </Routes>
    </Router>
  );
};

export default App;



