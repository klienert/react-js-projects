import React from "react";

const BOARD_SIZE = 20; // 20x20 grid

const Board = ({ snake, food }) => {
    
    return (
        <div className="snake-board">
            {Array.from({ length: BOARD_SIZE }).map((_, row) => (
                <div key={row} className="snake-row">
                    {Array.from ({ length: BOARD_SIZE }).map((_, col) => {
                        const isSnake = snake.some((segment) => segment.x === col && segment.y === row); 
                        const isFood = food.x === col && food.y === row;

                        return (
                            <div 
                                key={col}
                                className={`cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""}`}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Board;