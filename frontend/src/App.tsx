import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategorySelectPage from './pages/CategorySelectPage';
import QuizResult from './pages/QuizResult';
import QuizByCategoryPage from './pages/QuizByCategoryPage';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import SiteFeedbacks from './pages/SiteFeedbacks';
import EndPage from './pages/EndPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="/category-select" element={<CategorySelectPage />} />
        <Route
          path="/quiz/:categoryId/:questionIndex"
          element={<QuizByCategoryPage />}
        />
        <Route path="/quiz/result" element={<QuizResult />} />
        <Route path="/end" element={<EndPage />} />
        <Route path="/site-feedbacks" element={<SiteFeedbacks />} />
      </Routes>
    </Router>
  );
};

export default App;
