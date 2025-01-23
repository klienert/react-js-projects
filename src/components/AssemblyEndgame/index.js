import { useState } from 'react';
import './styles.css';
import { languages } from './language';
import clsx from 'clsx';
import { getFarewellText, getRandomWord } from './utils';
import Confetti from "react-confetti";

const AssemblyEndgame = () => {

    // state values
    const [currentWord, setCurrentWord] = useState(() => getRandomWord());
    const [userGuess, setUserGuess] = useState([]);
        
    // derived values
    const numGuessesLeft = languages.length - 1;
    const wrongGuessCount = userGuess.filter(letter => !currentWord.includes(letter)).length;
    const isGameWon = currentWord.split("").every(letter => userGuess.includes(letter));
    const isGameLost = wrongGuessCount >= numGuessesLeft;
    const lastGuessedLetter = userGuess[userGuess.length -1];
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);    
    
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
        const isCorrect = isGuessed && currentWord.includes(x);
        const isWrong = isGuessed && !currentWord.includes(x);
        
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
        setUserGuess([]);
    }

    return (
        <section className="assembly-container">
            <div className='assembly-title'>
                <h2>Assembly: Endgame</h2>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </div>
            <div 
                className={gameStatusClass}
                aria-live="polite"
                role="status"
            >
                {gameStatus()}    
            </div>
            <div className='assembly-lang-tiles'>
                <ul>                
                    {langArr}
                </ul>
            </div>
            <div className='assembly-guess-tiles'>
                <ul>
                    {currWord}
                </ul>
            </div>
            <div 
                className="sr-only"
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