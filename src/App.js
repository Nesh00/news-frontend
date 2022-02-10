import { Navigate, Route, Routes } from 'react-router-dom';
import { UserContext } from './contexts/User';
import { useState } from 'react';
import Articles from './components/Articles/Articles';
import Topics from './components/Topics/Topics';
import ArticleById from './components/Articles/ArticleById/ArticleById';
import './App.css';
import Login from './components/TopPage/Login/Login';
import SliderImg from './components/Slider/Slider';

const App = () => {
  const [user, setUser] = useState({});

  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
        <Login />
        <SliderImg />
        <Topics />
        <Routes>
          <Route path={`/articles`} element={<Articles />} />
          <Route path={`/articles/:article_id`} element={<ArticleById />} />
          <Route path={'*'} element={<Navigate to={'/articles'} replace />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
