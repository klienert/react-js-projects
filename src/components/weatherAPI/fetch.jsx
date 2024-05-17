import React, { useEffect, useState } from "react";
import "./weather.css";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

// https://www.weatherapi.com/my/
// https://api.weatherapi.com/v1/forecast.json?key=3ccb52233b424b7a8d9140104232303&q=London&days=5
const TEST = '77320';

const url = (loc) => {
    const prefix = 'https://api.weatherapi.com/v1/current.json?';
    const forecastPrefix = 'https://api.weatherapi.com/v1/forecast.json?';
    const suffix = '&aqi=no&alerts=no';
    const key = '3ccb52233b424b7a8d9140104232303';
    return forecastPrefix + 'key=' + key + '&q=' + loc + '&days=' + 5 + suffix;
}

const getDate = (input) => {
    let date;
    if (typeof input === 'string') {
        date = new Date(input);
    } else {
        throw new Error('Invalid input type');
    }
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timezone: 'America/Chicago'
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);

    return formatter.format(date);
    // TODO: This is returning the wrong date... 
}

// substitute TEST for loc, bring loc in as a param
const GetCurrentWeather = () => {
    // Define state to store the fetched data
    const [data, setData] = useState(null);    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (setData) => {
            try {
                const resp = await fetch(url(TEST));
                const jsonData = await resp.json();
                setData(jsonData);
            } catch (err) {
                console.error('Error fetching API data:', err);            
            } finally {
                setIsLoading(false);
            }
        };
        fetchData(setData);        
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data])

    

    // console.log(data && data.forecast.forecastday[0].date);
    // console.log(data && data.forecast.forecastday[1].date);
    console.log(data && data.forecast.forecastday[2].date);


    return (
        <>
        {isLoading ? 
            <div>Weather Data Loading...</div> 
            :
            <div className="currWeather row">
                <div className="current col-md-3">
                    <div className="current-loc">
                        <p className="curr-location-name">{data && data.location.name}</p>
                        <p>{data && data.location.region}</p>
                    </div>
                    <div className="current-temp">
                        <img src={data && data.current.condition.icon} alt={data && data.current.condition.text}  />
                        <span className="curr-location-tempf">{data && data.current.temp_f}</span>
                        <span className="curr-location-tempUnit">&#8457;</span>
                    </div>
                    <div className="current-feel">
                        <p className="curr-feel">RealFeel {data && data.current.feelslike_f} &#8457;</p>
                    </div>                        
                </div>                
                <div className="forecast col-md-6">
                    <div className="forecast-day1 col-md-6">
                        <div className="current-loc row">
                            <p className="forecast-date">{data && getDate(data.forecast.forecastday[1].date)}</p>                            
                        </div>
                        <div className="current-temp">
                            <img src={data && data.forecast.forecastday[1].day.condition.icon}  alt={data && data.forecast.forecastday[1].day.condition.text} />
                            &nbsp;
                            Precip:&nbsp;<span className="forecast-precip">{data && data.forecast.forecastday[1].day.daily_chance_of_rain}</span>&#37;
                        </div>
                        <div className="current-feel">
                            <p className="forecast-temps">
                                <span className="forecast-hi-tempf"><FaLongArrowAltUp />{data && data.forecast.forecastday[1].day.maxtemp_f}</span>
                                <span className="forecast-tempUnit">&#8457;</span>
                                <span className="forecast-lo-tempf"><FaLongArrowAltDown />{data && data.forecast.forecastday[1].day.mintemp_f}</span>
                                <span className="forecast-tempUnit">&#8457;</span>
                            </p>
                        </div>                                            
                    </div>
                    <div className="forecast-day2 col-md-6">
                        <div className="current-loc row">
                            <p className="forecast-date">{data && getDate(data.forecast.forecastday[2].date)}</p>
                        </div>
                        <div className="current-temp">
                            <img src={data && data.forecast.forecastday[2].day.condition.icon}  alt={data && data.forecast.forecastday[2].day.condition.text} />
                            &nbsp;
                            Precip: <span className="forecast-precip">{data && data.forecast.forecastday[2].day.daily_chance_of_rain}</span>&#37;
                        </div>
                        <div className="current-feel">
                            <p className="forecast-temps">
                                <span className="forecast-hi-tempf"><FaLongArrowAltUp />{data && data.forecast.forecastday[2].day.maxtemp_f}</span>
                                <span className="forecast-tempUnit">&#8457;</span>
                                <span className="forecast-lo-tempf"><FaLongArrowAltDown />{data && data.forecast.forecastday[2].day.mintemp_f}</span>
                                <span className="forecast-tempUnit">&#8457;</span>
                            </p>
                        </div>
                    </div>                    
                </div>
            </div>
        }        
        </>        
    )
}

export default GetCurrentWeather;