import { Route, Routes } from 'react-router-dom';
import Articles from './components/Articles/Articles';
import Topics from './components/Nav-Topics/Nav-Topics';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Topics />
      <Routes>
        <Route path={`/articles`} element={<Articles />} />
      </Routes>
    </div>
  );
};

export default App;
