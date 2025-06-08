import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategorySelectPage from "./pages/CategorySelectPage";
import QuizResult from "./pages/QuizResult";
import QuizByCategoryPage from "./pages/QuizByCategoryPage";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/category-select" element={<CategorySelectPage />} />
        <Route path="/quiz/:categoryId" element={<QuizByCategoryPage />} />
        <Route path="/quiz/result" element={<QuizResult />} />
      </Routes>
    </Router>
  );
};

export default App;



