import './css/App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from './contexts/User';
import Login from './components/TopPage/Login';
import SliderImg from './components/Header/Slider';
import Topics from './components/Nav/Topics';
import Articles from './components/Articles/Articles';
import ArticleById from './components/Articles/ArticleById';

const App = () => {
  const [user, setUser] = useState({});

  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
        <Login />
        <SliderImg />
        <Topics />
        <Routes>
          <Route path={'/articles'} element={<Articles />} />
          <Route path={'/articles/:article_id'} element={<ArticleById />} />
          <Route path={'*'} element={<Navigate to={'/articles'} />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
