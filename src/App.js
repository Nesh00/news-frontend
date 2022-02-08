// import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Articles from './components/Articles/Articles';
import Topics from './components/Nav-Topics/Nav-Topics';

function App() {
  return (
    <div className='App'>
      <Topics />
      {/* <Routes>
        <Route path={`/articles`} element={<Articles />} />
      </Routes> */}
    </div>
  );
}

export default App;
