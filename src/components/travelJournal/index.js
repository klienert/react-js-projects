import React from "react";
import Header from "./components/Header";
import Entry from "./components/Entry";
import "./styles.css";
import data from "./data";

const TravelJournal = () => {

    const entryElements = data.map((x) => {
        console.log(x);
        return (
            <Entry 
                key={x.id}
                entry={x}
                // img={{
                //     src:x.src,
                //     alt:x.alt
                // }}
                // title={x.title}
                // country={x.country}
                // googleMapsLink={x.googleMapsLink}
                // dates={x.dates}
                // text={x.text}
                // index={index}
            />
        )
    })

    return (
        <div className="travel-journal-container">            
            <Header />
            {entryElements}
            
            {/* <Entry 
                img={{
                        src:"https://scrimba.com/links/travel-journal-japan-image-url",
                        alt:"Mount Fuji"
                    }}
                title="Mount Fuji"
                country="Japan"
                googleMapsLink="https://www.google.com/maps/place/Mount+Fuji/@35.3606421,138.7170637,15z/data=!3m1!4b1!4m6!3m5!1s0x6019629a42fdc899:0xa6a1fcc916f3a4df!8m2!3d35.3606255!4d138.7273634!16zL20vMGNrczA?entry=ttu"
                dates="12 Jan, 2021 - 24 Jan, 2021"
                text="Mount Fuji is the tallest mountain in Japan, standing at 3,776 meters (12,380 feet). Mount Fuji is the single most popular tourist site in Japan, for both Japanese and foreign tourists."            
            /> */}
        </div>
    )
}

export default TravelJournal;