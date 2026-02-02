import { Routes, Route } from 'react-router-dom';
import './App.css';
import CurrentDate from './components/date';
import CurrentWeather from './components/weatherAPI/currentWeather';
import ChefClaude from './components/ChefClaude';
import Tenzies from './components/Tenzies';
import AssemblyEndgame from './components/AssemblyEndgame';
import MenuNav from './components/MenuChildren/index';
import ThemeExample from './components/ThemeEx/index';
import SnakeGame from './components/Snake/Game';
// import Wordle from './components/Wordle';
import InputPractice from './components/inputPractice';
import LinkedListComp from './components/linkedList';
import ComplexFormApp from './components/form';
import ReportsSample from './components/reports';
// import ToggleComp from './components/ToggleComp';

function App() {

  return (
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
              <MenuNav menuDetails={ [
                  {to: "/", name: "Home"},
                  // {to: "/ai", name: "Chef Claude"}, 
                  {to: "/tenzies", name: "Tenzies"},
                  {to: "/assembly", name: "Assembly Endgame"},
                  {to: "/reportsSample", name: "Reports Sample"}
                  // {to: "/theme", name: "Theme Change"},
                  // {to: "/snake", name: "Snake Game"},
                  // {to: "/wordle", name: "Wordle"},
                  // {to: "/inputPractice", name: "Input Practice"},
                  // {to: "/linkedList", name: "LinkedList Practice"}
                  // {to: "/complexForm", name: 'Complex Form'}
                ] }/>
            </div>
          </div>
        </div>
        {/* refPractice */}
        <div className="row mx-auto no-wrap">
        </div>
        <Routes>
          {/* <Route path="/ai" element={<ChefClaude/>} /> */}
          <Route path="/tenzies" element={<Tenzies />} />
          <Route path="/assembly" element={<AssemblyEndgame />} />
          <Route path="/reportsSample" element={<ReportsSample />} />
          {/* <Route path="/theme" element={<ThemeExample />} /> */}
          {/* <Route path="/snake" element={<SnakeGame />} /> */}
          {/* <Route path="/wordle" element={<Wordle />} /> */}
          {/* <Route path="/inputPractice" element={<InputPractice />} /> */}
          {/* <Route path="/linkedList" element={<LinkedListComp/>} /> */}
          {/* <Route path="/complexForm" element={<ComplexFormApp />} /> */}
        </Routes>
      </div>
  );
}

export default App;
