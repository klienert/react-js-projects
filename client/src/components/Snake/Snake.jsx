import { useEffect } from "react";

const Snake = ({ snake, setSnake, direction, food, setFood, setScore, score, speed, setCollision }) => {

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
                    break;
            }

            // Collision?
            if (
                head.x < 0 || head.y < 0 || 
                head.x >= 20 || head.y >= 20 || 
                newSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
                setCollision(true);
                return;
            }

            // Move snake
            newSnake.unshift(head);

            // Check if food is eaten
            if (head.x === food.x && head.y === food.y) {
                setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)});
                // increase score
                setScore((prev) => prev + 1);
            } else {
                newSnake.pop(); // removes tail if no food eaten
            }
            setSnake(newSnake);
        };

        // console.log(`Speed: ${speed}`);
        // // sets the speed
        // if (score > 2) {
        //     setSpeed((prev) => speed - 5);
        // }
        const interval = setInterval(moveSnake, speed);
        return () => clearInterval(interval);
    }, [snake, setSnake, direction, food, setFood, setScore, score, speed, setCollision]);

    return null;
}

export default Snake;