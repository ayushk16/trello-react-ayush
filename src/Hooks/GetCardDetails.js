import { useEffect, useState } from 'react'
import axios from 'axios'


const useGetCardDetails = (cardId) => {
    const [cardDetails, setCardDetails] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios({
            method: "GET",
            url: `https://api.trello.com/1/cards/${cardId}`,
            params: {
                key: import.meta.env.VITE_API_KEY,
                token: import.meta.env.VITE_TOKEN
            }
        }).then(res => {
            setCardDetails(res.data);
            setLoading(false);
        }).catch(err => {
            console.log('error in GetCardDetails in hooks', err);
            setLoading(false);
            setError(err);
        })
    }, [])
    return ({ cardDetails, setCardDetails, loading, error })

}

export default useGetCardDetails