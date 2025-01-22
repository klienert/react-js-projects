// https://youtu.be/5ZdHfJVAY-s?si=AJhaXd5c4CbPokLd
import './App.css';
import CurrentDate from './components/date';
// import DarkModeToggle from './components/darkmode/darkmode';
// import Counter from './components/counter';
// import TicTacToe from './components/tic-tac-toe';
// import Todo from './components/todoList/Todo';
import CurrentWeather from './components/weatherAPI/currentWeather';
// import RandomQuoteGenerator from './components/RandomQuote/index';
// import Calculator from './components/calculator';
// import Wordle from './components/wordle';
// import StaticPage from './components/static_pages';
// import TravelJournal from './components/travelJournal';
// import ReviewMaps from './components/MapReview';
// import Contacts from './components/Contacts';
// import Jokes from './components/Jokes';
// import MemeGenerator from './components/memeGenerator';
import ChefClaude from './components/ChefClaude';
// import UsingUseEffect from './components/useEffect';
import Tenzies from './components/Tenzies';
import AssemblyEndgame from './components/AssemblyEndgame';

function App() {
  
  // add a list of useStates, 
  // buttons for each component

  return (
    <div className="App">      
      <div className="container">        
        <div className='row mx-auto no-wrap' >
          <div className='col-8'>
            <CurrentDate  name={"Keith"} />            
          </div>
        </div>
        <div className='row mx-auto no-wrap'>
          <div className='col-8'>
            <CurrentWeather />
          </div>
        </div>        
        {/* <div className='row mx-auto no-wrap'>
          <RandomQuoteGenerator />
        </div> */}
        
        {/* <div className='row mx-auto no-wrap'>
          <Wordle />
        </div> */}
        {/* <div className='row mx-auto no-wrap'>
          <StaticPage />
        </div> */}
        {/* <div className='row mx-auto no-wrap'>
          <TravelJournal />
        </div> */}
        {/* <div className='row mx-auto no-wrap'>
          <Contacts />
        </div>         */}
        
        <div className='row mx-auto no-wrap'>
          <ChefClaude />
        </div>
        {/* <div className='row mx-auto no-wrap'>
          <MemeGenerator />
        </div> */}
        <div className='row mx-auto no-wrap'>
          <div className='col-6'>
            <Tenzies />
          </div>
          <div className='col-6'>
            <AssemblyEndgame />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
