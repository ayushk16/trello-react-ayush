import React, { useEffect, useState } from 'react'
import axios from 'axios'



const useGetBoardTile = (boardId) => {
    const [boardTile, setBoardTile] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true)
        axios({
            method: "Get",
            url: `https://api.trello.com/1/boards/${boardId}`,
            params: {
                key: import.meta.env.VITE_API_KEY,
                token: import.meta.env.VITE_TOKEN
            }
        })
            // .then(res => console.log(res.data))
            .then((res) => {

                setBoardTile(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setError(err);
            })
    }, [useGetBoardTile])
    return ({ boardTile, loading, error })

}

export default useGetBoardTile