import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useGetCheckItem = (checkListId, checkItemId) => {
    const [checkItemData, setCheckItemData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios({
            method: "GET",
            url: `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}`,
            params: {
                key: import.meta.env.VITE_API_KEY,
                token: import.meta.env.VITE_TOKEN
            }
        }).then(res => {
            setCheckItemData(res.data);
            console.log('from api', res.data)
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
            setError(err);
        })
    }, [useGetCheckItem, checkListId, checkItemId])
    return ({ checkItemData, setCheckItemData, loading, error })
}

export default useGetCheckItem