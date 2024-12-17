// https://youtu.be/5ZdHfJVAY-s?si=AJhaXd5c4CbPokLd
import './App.css';
import CurrentDate from './components/date';
import DarkModeToggle from './components/darkmode/darkmode';
import Counter from './components/counter';
// import CurrencyConvert from './components/currency-converter';
// import NewCounter from './components/hook-mistakes/num12';
// import ProductCard from './components/hook-mistakes/num11';
// import User from './components/hook-mistakes/num10';
// import Form from './components/hook-mistakes/num9';
// import Cart from './components/hook-mistakes/num8';
// import Price from './components/hook-mistakes/num7';
// import BlogPost from './components/hook-mistakes/num6';
// import ExampleComponent1 from './components/hook-mistakes/num4';
// import ServerComponentExample from './components/hook-mistakes/num3';
// import CounterExample from './components/hook-mistakes/num2';
// import Post from './components/hook-mistakes/num1';
// import TicTacToe from './components/tic-tac-toe';
// import HookBtn from './components/hooks/hook1'
// import HookCheck from './components/hooks/hook2';
// import StarRating from './components/hooks/hook3';
// import UseEffectHook from './components/hooks/hook4';
// import FetchingData from './components/hooks/hook5';
// import Reducer from './components/hooks/hook6';
// import ReducerCheck from './components/hooks/hook7';
// import Colors from './components/hooks/hook8';
// import Todo from './components/todoList/Todo';
import CurrentWeather from './components/weatherAPI/currentWeather';
import RandomQuoteGenerator from './components/RandomQuote/index';
import Calculator from './components/calculator';
import Wordle from './components/wordle';

function App() {
  
  // add a list of useStates, 
  // buttons for each component

  return (
    <div className="App">      
      <div className="container">        
        <div className='row mx-auto no-wrap' >
          <div className='col-xs-4 '>
            <CurrentDate  name={"Keith"} />
            <DarkModeToggle />
          </div>
          <div className='col-xs-8'>
            <CurrentWeather />
          </div>          
        </div>
        <hr></hr>
        <div className='row'> <Counter/></div>
        <div className='row mx-auto no-wrap'>
          <div className='col'> <RandomQuoteGenerator /></div>
          <div className='col'> <Calculator /></div>
        </div>
        <div className='row'> <Wordle /></div>
        
        

      </div>
    </div>
  );
}

export default App;
