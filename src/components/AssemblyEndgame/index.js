import { useState } from 'react';
import './styles.css';
import { languages } from './language';
import clsx from 'clsx';
import { getFarewellText, getRandomPhrase, getRandomWord } from './utils';
import Confetti from "react-confetti";

const AssemblyEndgame = () => {
    const test = {category: 'testing', phrase:'JUST CHECKING IN'};

    // state values
    const [currentWord, setCurrentWord] = useState(() => getRandomWord());
    // const [currentSentence, setCurrentSentence] = useState(()=> getRandomPhrase());
    const [currentSentence, setCurrentSentence] = useState(test);
    const [userGuess, setUserGuess] = useState([]);
    const [gameMode, setGameMode] = useState(false);
    
    const currSentenceArray = currentSentence.phrase.split(' '); // array of words    
    const currSentenceOneWord = currSentenceArray.reduce((res, word) => res += word.trim(), '');
    
    
    // derived values
    const numGuessesLeft = gameMode ? languages.length - 1 : currSentenceArray.reduce((total, word) => total + word.length, 0);
    const wrongGuessCount = userGuess.filter(letter => !currentWord.includes(letter)).length;
    // const isGameWon = currentWord.split("").every(letter => userGuess.includes(letter));
    const isGameWon = gameMode ? currentWord.split("").every(letter => userGuess.includes(letter)) :
                                currSentenceOneWord.split("").every(letter => userGuess.includes(letter));
    const isGameLost = wrongGuessCount >= numGuessesLeft;
    const lastGuessedLetter = userGuess[userGuess.length -1];
    const isLastGuessIncorrect = gameMode ?
        lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
        :
        lastGuessedLetter && !currSentenceOneWord.includes(lastGuessedLetter);
    
    const isGameOver = isGameWon || isGameLost;

    // static
    const letters = "abcdefghijklmnopqrstuvwxyz";
    
    // user guessed letters
    const addGuessedLetter = (letter) => {
        setUserGuess(prevLetters => 
            prevLetters.includes(letter) ? 
            prevLetters : 
            [...prevLetters, letter]);
    }

    // language tiles
    const langArr = languages.map((item, index) => {
        const isLangLost = index < wrongGuessCount;        
        const styles = {
            backgroundColor: item.backgroundColor,
            color: item.color
        }
        
        const className = clsx('lang-tile', isLangLost && "lost");
        return (            
            <li
                key={index}
                className={className}
                style={styles}
            >{item.name}</li>
        )
    })

    // keyboard
    const keyboardElements = letters.split('').map((x, i) => {
        const isGuessed = userGuess.includes(x);
        const isCorrect = gameMode ? isGuessed && currentWord.includes(x) : isGuessed && currSentenceOneWord.includes(x);
        const isWrong = gameMode ? isGuessed && !currentWord.includes(x) : isGuessed && !currSentenceOneWord.includes(x);               
        
        const className = clsx({
            keyboard_key_correct: isCorrect,
            keyboard_key_wrong: isWrong
        });

        return (
            <button 
                key={i}
                className={className}
                disabled={isGameOver}
                aria-disabled={userGuess.includes(x)}
                aria-label={`Letter ${x.toUpperCase()}`}
                onClick={ () => addGuessedLetter(x) }
            >{x.toUpperCase()}</button>
        )
    })
        
    // current word
    const currWord = currentWord.split('').map((x, i) => {
        const shouldRevealLetter = isGameLost || userGuess.includes(x);
        const letterClassName = clsx("guess-tile", {
            missedLetter: isGameLost && !userGuess.includes(x)
        });

        return (
            <li
                className={letterClassName}
                key={i}
            >
                {/* {userGuess.includes(x) ? x.toUpperCase() : ""} */}
                {shouldRevealLetter ? x.toUpperCase() : ""}
            </li>
        )
    })

    // current phrase
    const currPhrase = currentSentence.phrase.split(' ').forEach((word, count) => {
        // console.log(count); // num of word (0-based counting) -- this the number of 'spaces' required between words
        word.split('').map((letter, i) => {
            // console.log(letter);
            const shouldRevealLetter = isGameLost || userGuess.includes(letter);
            const letterClassName = clsx("guess-tile", {
                missedLetter: isGameLost && !userGuess.includes(letter)
            });
            return (
                <li
                    className={letterClassName}
                    key={i}
                >
                    {shouldRevealLetter ? letter.toUpperCase(): ""}
                </li>
            )
        })
    })


    const gameStatusClass = clsx("assembly-game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    });

    const gameStatus = () => {
        if (isGameOver) {
            if (isGameWon) {
                return (
                    <>
                    <Confetti 
                        recycle={false}
                        numberOfPieces={2000}
                    />
                    <h2>You win!</h2><p>Well done! 🎉</p>
                    </>
                )            
            } else if (isGameLost) {
                return (
                    <>
                    <h2>Game Over!</h2>
                    <p>You Lost. Better start learning Assembly</p>
                    </>
                    )
            } else {
                return ("")
            }
        } else if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p className="farewell-message">{`"${getFarewellText(languages[wrongGuessCount - 1].name)}"`}</p>
            )
        } else { // game is still in play
            return ("");
        }
    }

    const newGame = () => {
        setCurrentWord(()=> getRandomWord());
        setCurrentSentence(() => getRandomPhrase());
        setUserGuess([]);
    }

    // const toggleGameMode = () => {
    //     setGameMode((prevMode) => {
    //         const newMode = !prevMode;
            
    //         return newMode;
    //     })        
    // }

    return (
        <section className="assembly-container">
            <div className='assembly-title'>
                <h2>Assembly: Endgame</h2>
                <p>Guess the word (or sentence) in under 8 attempts to keep the programming world safe from Assembly!</p>
            </div>
            <div 
                className={gameStatusClass}
                aria-live="polite"
                role="status"
            >
                {gameStatus()}    
            </div>
            {/* <div className='assembly-toggle'>
                <label className="assembly-switch">
                    <input 
                        type="checkbox"
                        aria-label="game mode switch"
                        onChange={toggleGameMode}
                    />
                    <span className="assembly-slider"></span>
                </label>
            </div> */}
            <div className='assembly-lang-tiles'>
                <ul>                
                    {langArr}
                </ul>
            </div>
            {/* create a button to switch between currWord and currSentence */}
            <div className='assembly-guess-tiles'>
                <ul>
                    {currWord}
                    {/* {currPhrase} */}
                </ul>
            </div>
            <div 
                className="assembly-sr-only"
                aria-live="polite"
                role="status"
            >
                <p>
                    {currentWord.includes(lastGuessedLetter) ?
                        `Correct! The letter ${lastGuessedLetter} is in the word` :
                        `Incorrect, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {numGuessesLeft} attempts left.
                </p>
                <p>Current Word: {currentWord.split("").map(letter => userGuess.includes(letter) ? letter + "." : "blank").join(" ") }
                </p>

            </div>
            <div className='assembly-keyboard'>
                {keyboardElements}
            </div>
            {isGameOver && 
                <button 
                    className='new-game'
                    onClick={newGame}
                >New Game</button>
            }            
        </section>        
    )
}

export default AssemblyEndgame;