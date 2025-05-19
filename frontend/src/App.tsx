import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategorySelectPage from "./pages/categorySelectPage";
import QuizResult from "./pages/quizResult";
import QuizByCategoryPage from "./pages/QuizByCategoryPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/quiz-top" element={<CategorySelectPage />} />
        <Route path="/quiz/:categoryId" element={<QuizByCategoryPage />} />
        <Route path="/quiz/result" element={<QuizResult />} />
      </Routes>
    </Router>
  );
};

export default App;



