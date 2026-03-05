import React from "react";

const BOARD_SIZE = 20; // 20x20 grid

const Board = ({ snake, food }) => {
    const snakeHead = snake[0];    
    
    return (
        <div className="snake-board">
            {Array.from ({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
                const row = Math.floor(index / BOARD_SIZE);
                const col = index % BOARD_SIZE;
                const isSnake = snake.some((segment) => segment.x === col && segment.y === row);
                const isHead = snakeHead.x === col && snakeHead.y === row;
                const isFood = food.x === col && food.y === row;

                return (
                    <div 
                        key={index}
                        className={`cell ${isSnake ? "snake" : ""}${isFood ? "food" : ""}${isHead ? " snake-head" : ""}`}
                        id={`${col}-${row}`}
                    />
                );
            })}
        </div>
    )
};

export default Board;