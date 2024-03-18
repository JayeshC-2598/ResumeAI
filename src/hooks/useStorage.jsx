import React, { useState } from 'react';

function useStorage() {
    const [error, setError] = useState(null);

    const setItem = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }
    const getItem = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }
    return { setItem, getItem, error }
}

export default useStorage