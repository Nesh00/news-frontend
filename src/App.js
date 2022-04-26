import './css/App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/TopPage/Login';
import SliderImg from './components/Header/Slider';
import Topics from './components/Nav/Topics';
import Articles from './components/Articles/Articles';
import ArticleById from './components/Articles/ArticleById';
import Register from './components/TopPage/Register';

const App = () => {
  return (
    <div className='App'>
      <Login />
      <Register />
      <SliderImg />
      <Topics />
      <Routes>
        <Route path={'/articles'} element={<Articles />} />
        <Route path={'/articles/:article_id'} element={<ArticleById />} />
        <Route path={'*'} element={<Navigate to={'/articles'} />} />
      </Routes>
    </div>
  );
};

export default App;
