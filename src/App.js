import { Navigate, Route, Routes } from 'react-router-dom';
import { UserContext } from './contexts/User';
import { useState } from 'react';
import Articles from './components/Articles/Articles';
import Topics from './components/Topics/Topics';
import ArticleById from './components/ArticleById/ArticleById';
import './App.css';
import Login from './components/TopPage/Login/Login';

const App = () => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='App'>
      <UserContext.Provider
        value={{ user, setUser, isLoggedIn, setIsLoggedIn }}
      >
        <Login />
        {/* <Header /> */}
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
