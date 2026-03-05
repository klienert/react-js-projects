import axios from "axios";

const fetchGet = async (endpoint, includeCredentials = false, attempts = 0) => {
    const fetchFn = () => {       
        fetch(`${endpoint}`, {
            method: 'GET',
            credentials: includeCredentials ? 'include' : 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return fetchHelper(fetchFn, attempts);
    }
};

const fetchHelper = async (fetchFn, attempts, maxAttempts = 5) => {
    try {
        const resp = await fetchFn();
        if (!resp.ok) {
            throw new Error(`HTTP error. Status: ${resp.status}`);
        }
        return await resp.json();        
    } catch (err) {
        if (attempts < maxAttempts) {
            console.warn(`Retrying...(${attempts + 1}/${maxAttempts})`);
            return fetchHelper(fetchFn, attempts + 1, maxAttempts);
        }
        console.error('Fetch failed:', err);
        throw err;
    }
}

export {
    fetchGet
}