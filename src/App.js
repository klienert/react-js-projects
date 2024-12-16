// https://youtu.be/5ZdHfJVAY-s?si=AJhaXd5c4CbPokLd
import './App.css';
import CurrentDate from './components/date';
// import Accordian from './components/accordian';
// import RandomColor from './components/random-color';
// import Counter from './components/counter';
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
// import TypesOfFood from './components/fcc1/fcc1';
// import Calendar from './components/fcc1/fcc2';
// import ShoppingCart from './components/fcc1/fcc3';
// import App1 from './components/fcc1/fcc4';
// import CampSite from './components/fcc1/fcc5';
// import StatefulComponent from './components/fcc2/state1';
// import MyComponent from './components/fcc2/state2';
// import FCC_Counter from './components/fcc2/counter1';
// import ControlledInput from './components/fcc2/controlledInput';
// import MyForm from './components/fcc2/controlledForm';
// import MyApp1 from './components/fcc2/passProps';
// import MyApp2 from './components/fcc2/callbackProps';
// import DidMount from './components/fcc2/didMount';
// import EventListening from './components/fcc2/eventListener';
// import Controller from './components/fcc2/shouldUpdate';
// import Colorful from './components/fcc2/inlineStyles';
// import MagicEightBall from './components/fcc2/magicEight';
// import ConditionalRender from './components/fcc2/conditionalRender';
// import MoreConditional from './components/fcc2/moreConditional';
// import CheckUserAge from './components/fcc2/ternaryExp';
// import GameOfChance from './components/fcc2/gameChance';
// import GateKeeper from './components/fcc2/cssSetState';
// import MyToDoList from './components/fcc2/MyToDo';
// import Frameworks from './components/fcc2/frameworks';
// import UsingArrayFilter from './components/fcc2/usingFilter';
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
          </div>
          <div className='col-xs-8'>
            <CurrentWeather />
          </div>          
        </div>
        <hr></hr>
        {/* <div className='row'> <StatefulComponent /> </div> */}
        {/* <div className='row'> <MyComponent /> </div> */}
        {/* <div className='row'> <FCC_Counter /> </div> */}
        {/* <div className='row'> <ControlledInput /> </div> */}
        {/* <div className='row'> <MyForm /> </div> */}
        {/* <div className='row'> <MyApp1 /> </div> */}
        {/* <div className='row'> <MyApp2 /> </div> */}
        {/* <div className='row'> <DidMount /> </div> */}
        {/* <div className='row'> <EventListening /> </div> */}
        {/* <div className='row'> <Controller /> </div> */}
        {/* <div className='row'> <Colorful /> </div> */}
        {/* <div className='row'> <MagicEightBall /> </div> */}
        {/* <div className='row'> <ConditionalRender /> </div> */}
        {/* <div className='row'> <MoreConditional /> </div> */}
        {/* <div className='row'> <CheckUserAge /> </div> */}
        {/* <div className='row'> <GameOfChance />  </div> */}
        {/* <div className='row'> <GateKeeper /> </div> */}
        {/* <div className='row'> <MyToDoList /> </div> */}
        {/* <div className='row'> <Frameworks /> </div> */}
        {/* <div className='row'> <UsingArrayFilter /> </div> */}
        
{/*         
        <div className='row mx-auto no-wrap'>
          <div className='col'> <RandomQuoteGenerator /></div>
          <div className='col'> <Calculator /></div>
        </div> */}
        
        {/* Wordle  */}
        <div className='row'> <Wordle /></div>
        
        

      </div>
    </div>
  );
}

export default App;
