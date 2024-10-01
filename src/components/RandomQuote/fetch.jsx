import React, { useEffect, useState } from "react";
const url = "https://api.gameofthronesquotes.xyz/v1/random";

const GetRandomQuote = ({ fetchedQuote, fetchedAuthor }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(url);
                if (!resp.ok) {
                    throw new Error(`HTTP error! status: ${resp.status}`);
                }
                const jsonData = await resp.json();

                // format Data
                const formattedData = {
                    quote: jsonData.sentence,
                    author: jsonData.character.name
                };
                setData(formattedData);

                // pass formatted data
                fetchedQuote(formattedData.quote);
                fetchedAuthor(formattedData.author);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching API data: ', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // useEffect(() => {
    //     console.log(data);
    // }, [data])


    return null;
}

export default GetRandomQuote;