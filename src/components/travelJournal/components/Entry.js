import { useState } from "react";
import marker from "../img/geo-alt.svg";

const Entry = (props) => {
    // console.log(props);
    // const [ location, setLocation ] = useState("Japan");
    // const [ mapLink, setMapLink ] = useState("https://www.google.com/maps/place/Mount+Fuji/@35.3606421,138.7170637,15z/data=!3m1!4b1!4m6!3m5!1s0x6019629a42fdc899:0xa6a1fcc916f3a4df!8m2!3d35.3606255!4d138.7273634!16zL20vMGNrczA?entry=ttu");
    // const [ dates, setDates ] = useState("12 Jan, 2021 - 24 Jan, 2021");
    // const [ text, setText ] = useState("Mount Fuji is the tallest mountain in Japan, standing at 3,776 meters (12,380 feet). Mount Fuji is the single most popular tourist site in Japan, for both Japanese and foreign tourists.");
    // const [ entryTitle, setEntryTitle ] = useState("Mount Fuji");

    return (
        
        <article className="journal-entry">
            <div className="main-image-container">
                <img 
                    className="main-image" 
                    src={props.img.src} 
                    alt={props.img.alt} 
                />
            </div>
            <div className="info-container">
                <img 
                    className="marker"
                    src={marker} 
                    alt="map marker icon"
                />
                <span className="country">{props.country}</span>
                <a href={props.googleMapsLink} target="_blank" rel="noreferrer" >View on Google Maps</a>
                <h2 className="entry-title">{props.title}</h2>
                <p className="trip-dates">{props.dates}</p>
                <p className="entry-text">{props.text}</p>
            </div>
        </article>
    )
}

export default Entry;