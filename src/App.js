import { Route, Routes } from 'react-router-dom';
import Articles from './components/Articles/Articles';
import Topics from './components/Topics/Topics';
import ArticleById from './components/ArticleById/ArticleById';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Topics />
      <Routes>
        <Route path={`/articles`} element={<Articles />} />
        <Route path={`/articles/:article_id`} element={<ArticleById />} />
      </Routes>
    </div>
  );
};

export default App;
