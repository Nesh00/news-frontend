import { Navigate, Route, Routes } from 'react-router-dom';
import Articles from './components/Articles/Articles';
import Topics from './components/Topics/Topics';
import ArticleById from './components/ArticleById/ArticleById';
import './App.css';
import Header from './components/Header/Header';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Topics />
      <Routes>
        <Route path={`/articles`} element={<Articles />} />
        <Route path={`/articles/:article_id`} element={<ArticleById />} />
        <Route path={'*'} element={<Navigate to={'/articles'} replace />} />
      </Routes>
    </div>
  );
};

export default App;
