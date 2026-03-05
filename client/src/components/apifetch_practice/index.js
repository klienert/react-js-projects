import { useState, useEffect } from "react";
import { fetchGet } from "../../helpers/apiFetch/fetch"
import axios from "axios";

const FetchPractice = () => {

    const urlTest = "https://swapi.dev/api/people/1/";
    // weather url:
    const url = (loc) => {
        const forecastPrefix = 'https://api.weatherapi.com/v1/forecast.json?';
        const suffix = '&aqi=no&alerts=no';
        const key = '3ccb52233b424b7a8d9140104232303';
        return forecastPrefix + 'key=' + key + '&q=' + loc + '&days=' + 5 + suffix;
    }

    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get('https://api.weatherapi.com/v1/forecast.json?', {
            params: {
                q: 77320,
                days: 5,
                aqi: 'no',
                alerts: 'no',
                key: '3ccb52233b424b7a8d9140104232303'
            },
            timeout: 1000,
            // auth: {
            //     key: '3ccb52233b424b7a8d9140104232303'                
            // }, 
            responseType: 'json', 

        })
            .then((resp => {
                setData(resp);
            }))
            .catch((err) => {
                console.error('API Fetch Error: ', err);
            })
    }, []);
  
    // console.log(data.data.forecast.forecastday);
    return (
        <h2>Fetch Practice</h2>
    )
}

export default FetchPractice;