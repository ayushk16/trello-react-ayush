import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'


const useGetChecklists = (cardId) => {
    const [cardCheckLists, setCardCheckLists] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const getDetails = useCallback(() => {
        setLoading(true);
        axios({
            method: "GET",
            url: `https://api.trello.com/1/cards/${cardId}/checklists`,
            params: {
                key: import.meta.env.VITE_API_KEY,
                token: import.meta.env.VITE_TOKEN
            }
        }).then(res => {
            setCardCheckLists(res.data);
            //console.log('from api', res.data)
            setLoading(false);
        }).catch(err => {
            //console.log(err);
            setLoading(false);
            setError(err);
        })
    }, [cardId])

    useEffect(() => {
        getDetails();
    }, [useGetChecklists, cardId])
    return ({ cardCheckLists, setCardCheckLists, loading, error })
}

export default useGetChecklists