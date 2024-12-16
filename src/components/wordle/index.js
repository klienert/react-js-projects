import React from "react";
import './styles.css';

export default function Wordle () {


    return (
        <div className="wordle">
            <main className="app-module">
                <div className="board-container">
                    <div className="board-module">
                        <div className="board-row" aria-label="row 1">
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                        </div>
                        <div className="board-row" aria-label="row 2">
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                        </div>                    
                        <div className="board-row" aria-label="row 3">
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                        </div>
                        <div className="board-row" aria-label="row 4">
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                        </div>
                        <div className="board-row" aria-label="row 5">
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                        </div>
                        <div className="board-row" aria-label="row 6">
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                            <div className="board-tile"></div>
                        </div>
                    </div>
                </div>
                <div className="keyboard-container">
                    <div className="keyboard-row">
                        <button type="button" data-key="q" aria-label="add q" aria-disabled="false" class="keyboard-key">q</button>
                        <button type="button" data-key="w" aria-label="add w" aria-disabled="false" class="keyboard-key">w</button>
                        <button type="button" data-key="e" aria-label="add e" aria-disabled="false" class="keyboard-key">e</button>
                        <button type="button" data-key="r" aria-label="add r" aria-disabled="false" class="keyboard-key">r</button>
                        <button type="button" data-key="t" aria-label="add t" aria-disabled="false" class="keyboard-key">t</button>
                        <button type="button" data-key="y" aria-label="add y" aria-disabled="false" class="keyboard-key">y</button>
                        <button type="button" data-key="u" aria-label="add u" aria-disabled="false" class="keyboard-key">u</button>
                        <button type="button" data-key="i" aria-label="add i" aria-disabled="false" class="keyboard-key">i</button>
                        <button type="button" data-key="o" aria-label="add o" aria-disabled="false" class="keyboard-key">o</button>
                        <button type="button" data-key="p" aria-label="add p" aria-disabled="false" class="keyboard-key">p</button>
                    </div>
                    <div className="keyboard-row">
                        <div className="keyboard-key-spacer"></div>
                        <button type="button" data-key="a" aria-label="add a" aria-disabled="false" class="keyboard-key">a</button>
                        <button type="button" data-key="s" aria-label="add s" aria-disabled="false" class="keyboard-key">s</button>
                        <button type="button" data-key="d" aria-label="add d" aria-disabled="false" class="keyboard-key">d</button>
                        <button type="button" data-key="f" aria-label="add f" aria-disabled="false" class="keyboard-key">f</button>
                        <button type="button" data-key="g" aria-label="add g" aria-disabled="false" class="keyboard-key">g</button>
                        <button type="button" data-key="h" aria-label="add h" aria-disabled="false" class="keyboard-key">h</button>
                        <button type="button" data-key="j" aria-label="add j" aria-disabled="false" class="keyboard-key">j</button>
                        <button type="button" data-key="k" aria-label="add k" aria-disabled="false" class="keyboard-key">k</button>
                        <button type="button" data-key="l" aria-label="add l" aria-disabled="false" class="keyboard-key">l</button>
                        <div className="keyboard-key-spacer"></div>
                    </div>
                    <div className="keyboard-row">
                        <button type="button" data-key="↵" aria-label="enter" aria-disabled="true" class="keyboard-key keyboard-key-enterBackspace">enter</button>
                        <button type="button" data-key="z" aria-label="add q" aria-disabled="false" class="keyboard-key">q</button>
                        <button type="button" data-key="x" aria-label="add w" aria-disabled="false" class="keyboard-key">w</button>
                        <button type="button" data-key="c" aria-label="add e" aria-disabled="false" class="keyboard-key">e</button>
                        <button type="button" data-key="v" aria-label="add r" aria-disabled="false" class="keyboard-key">r</button>
                        <button type="button" data-key="b" aria-label="add t" aria-disabled="false" class="keyboard-key">t</button>
                        <button type="button" data-key="n" aria-label="add y" aria-disabled="false" class="keyboard-key">y</button>
                        <button type="button" data-key="m" aria-label="add u" aria-disabled="false" class="keyboard-key">u</button>
                        <button type="button" data-key="←" aria-label="backspace" aria-disabled="false" class="keyboard-key keyboard-key-enterBackspace">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" class="game-icon" data-testid="icon-backspace">
                                <path fill="var(--color1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
                            </svg>
                        </button>
                        
                    </div>    
                </div>
            </main>
        </div>
    )
}