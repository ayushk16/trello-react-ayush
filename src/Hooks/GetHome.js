import React, { useEffect, useState } from 'react'
import axios from 'axios'


const useGetHome = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    // const lastUrl = `key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_TOKEN}`
    const lastUrl = `key=537b641d27415d26a221d4f9cd736b2e&token=ATTA2aded428541342740a1e740389d73a90e8b6b943e5c1cbdf04788548355d5801612FEE20`

    useEffect(() => {
        setLoading(true)
        axios({
            method: "Get",
            url: `https://api.trello.com/1/members/me/boards?${lastUrl}`
        })
            .then((res) => {
                setBoards(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError(err);
            })
    }, [useGetHome])
    return ({ boards, setBoards, loading, error })

}

export default useGetHome