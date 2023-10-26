import React, { useEffect, useState } from 'react'
import axios from 'axios'


const usePostBoard = (name, setBoard) => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true)
        axios({
            method: "POST",
            url: `https://api.trello.com/1/members/me/boards`,
            params: {
                key: import.meta.env.VITE_API_KEY,
                token: import.meta.env.VITE_TOKEN
            }
        })
            .then((res) => {
                setBoard(res.data);
                //console.log(res.data);
                setLoading(false);
            })
            .catch(err => {
                //console.log(err);
                setLoading(false);
                setError(err);
            })
    }, [usePostBoard])
    // return ({ boardsData, loading, error })

}

export default usePostBoard