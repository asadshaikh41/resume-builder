import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './Register';
import Login from './Login';
import Resume from './Resume';
import ResumePreview from './Resume-Preview';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/resume' element={<Resume/>}/>
          <Route path='/resumePreview' element={<ResumePreview/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
