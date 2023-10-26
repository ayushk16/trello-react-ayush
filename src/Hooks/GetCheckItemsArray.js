import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useGetCheckItemsArray = (checkListId) => {
    const [checkItemsArray, setCheckItemsArray] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios({
            method: "GET",
            url: `https://api.trello.com/1/checklists/${checkListId}/checkItems`,
            params: {
                key: import.meta.env.VITE_API_KEY,
                token: import.meta.env.VITE_TOKEN
            }
        }).then(res => {
            setCheckItemsArray(res.data);
            console.log('from checkItemArray', res.data)
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
            setError(err);
        })
    }, [useGetCheckItemsArray, checkListId])
    return ({ checkItemsArray, setCheckItemsArray, loading, error })
}

export default useGetCheckItemsArray