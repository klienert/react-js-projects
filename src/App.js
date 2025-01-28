import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CurrentDate from './components/date';
import CurrentWeather from './components/weatherAPI/currentWeather';
import ChefClaude from './components/ChefClaude';
import Tenzies from './components/Tenzies';
import AssemblyEndgame from './components/AssemblyEndgame';

function App() {

  return (
    <BrowserRouter>    
      <div className="container">
        <div className='row mx-auto no-wrap' >
          <div className='col-9'>
              <div className="row">
                <CurrentDate name={"Keith"} />
              </div>
              <div className="row">
                <CurrentWeather />
              </div>
          </div>          
          <div className='col-3'>
            <div className="row nav-bar">
              <Link to="/">Home</Link>
              <Link to="/ai">Chef Claude</Link>
              <Link to="/tenzies">Tenzies</Link>
              <Link to="/assembly">Assembly Endgame</Link>              
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/ai" element={<ChefClaude/>} />
          <Route path="/tenzies" element={<Tenzies />} />
          <Route path="/assembly" element={<AssemblyEndgame />} />          
        </Routes>
      </div>      
    </BrowserRouter>
        
        
  );
}

export default App;
