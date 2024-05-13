import React, { useSWR } from "react";

// https://www.weatherapi.com/my/
// https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
const TEST = 'Houston';

const fetcher = (...args) =>
    fetch(...args)
    .then(res => res.json());

const Swr = (location) => {
    const {
        data: weather,
        error,
        isValidating,
    } = useSWR(`https://api.weatherapi.com/v1/current.json?key=3ccb52233b424b7a8d9140104232303&q=${TEST}&aqi=no`);

    if (error) return <div className='failed'>Failed to Load API</div>;
    if (isValidating) return <div className="Loading">Loading...</div>;

    return (
        <div>
            <ul>
            {weather && 
                weather.map((location, i) => (
                    <li>{i.name}</li>



                ))}
            </ul>
        </div>
    )
}

export default Swr;