import React, { useEffect, useState } from 'react'
import axios from 'axios'


const useGetCards = (listId) => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true)
        axios({
            method: "GET",
            url: `https://api.trello.com/1/lists/${listId}/cards`,
            params: {
                key: import.meta.env.VITE_API_KEY,
                token: import.meta.env.VITE_TOKEN
            }
        })
            .then((res) => {
                setCards(res.data);
                //console.log(res.data);
                setLoading(false);
            })
            .catch(err => {
                // //console.log(err);
                setLoading(false)
                setError(err);
            })
    }, [useGetCards, listId])
    return ({ cards, setCards, loading, error })

}

export default useGetCards