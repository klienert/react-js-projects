import React, { useState, useEffect} from "react";


const FetchingData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://api.github.com/users')
        .then(resp => resp.json())
        .then(setData);
    }, []); // when loading data (use an empty array)

    return (
        <>
            <div>
                <ul>
                    {data.map((user) => (
                        <li key={user.id}>{user.login}</li>
                    ))}
                </ul>
                <button
                    onClick={() => setData([])}
                >Remove Data</button>
            </div>
            
        </>        
    )
}

export default FetchingData;
