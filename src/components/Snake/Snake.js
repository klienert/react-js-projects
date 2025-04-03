import { useEffect } from "react";

const Snake = ({ snake, setSnake, direction, food, setFood }) => {
    useEffect(() => {
        const moveSnake = () => {
            let newSnake = [...snake];
            let head = { ...newSnake[0] };

            switch (direction) {
                case "UP":
                    head.y -= 1;
                    break;
                case "DOWN":
                    head.y += 1;
                    break;
                case "RIGHT":
                    head.x += 1;
                    break;
                case "LEFT":
                    head.x -= 1;
                    break;
                default:
                    return;
            }

            // Collision?
            if (
                head.x < 0 || head.y < 0 || 
                head.x >= 20 || head.y >= 20 || 
                newSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
                return;
            }

            // Move snake
            newSnake.unshift(head);

            // Check if food is eaten
            if (head.x === food.x && head.y === food.y) {
                setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)});
            } else {
                newSnake.pop(); // removes tail if no food eaten
            }
            setSnake(newSnake);
        };

        const interval = setInterval(moveSnake, 300);
        return () => clearInterval(interval);
    }, [snake, direction, food, setFood, setSnake]);

    return null;
}

export default Snake;