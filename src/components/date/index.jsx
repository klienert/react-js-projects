import './date.css';

export default function CurrentDate( { name }) {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let date = new Date();
    
    
    const greeting = (num) => {
        if (num < 12) {
            return "Good Morning";
        } else if (num >= 12 && num <= 18) {
            return "Good Afternoon";
        } else {            
            return "Good Evening";
        }
    }

    // console.log(date.getHours());
  
    return <div className="time">
        <h1>{greeting(date.getHours())}, {name}</h1>
        <p>Today is {days[date.getDay()]} {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p>
    </div>
}