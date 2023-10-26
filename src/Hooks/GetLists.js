import React, { useEffect, useState } from 'react'
import axios from 'axios'


const useGetList = (boardId) => {
    const [board, setBoard] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true)
        axios({
            method: "Get",
            url: `https://api.trello.com/1/boards/${boardId}/lists`,
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
    }, [useGetList])
    return ({ board, setBoard, loading, error })

}

export default useGetList