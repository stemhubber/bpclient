import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import HomePage from './main/Homepage';

function App() {


  return (
    <div className="App">
      <Router>
        <HomePage></HomePage>
      </Router>
    </div>
  );
}

export default App;
