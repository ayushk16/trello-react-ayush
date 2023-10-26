import React, { useEffect, useState } from 'react'
import axios from 'axios'


const useGetHome = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true)
        axios({
            method: "Get",
            url: `https://api.trello.com/1/members/me/boards`,
            params: {
                key: import.meta.env.VITE_API_KEY,
                token: import.meta.env.VITE_TOKEN
            }
        })
            .then((res) => {
                setBoards(res.data);
                setLoading(false);
            })
            .catch(err => {
                //console.log(err);
                setLoading(false);
                setError(err);
            })
    }, [useGetHome])
    return ({ boards, setBoards, loading, error })

}

export default useGetHome