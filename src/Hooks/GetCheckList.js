import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useGetChecklist = (checklistId) => {
    const [checkListData, setCheckListData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios({
            method: "GET",
            url: `https://api.trello.com/1/checklists/${checklistId}`,
            params: {
                key: import.meta.env.VITE_API_KEY,
                token: import.meta.env.VITE_TOKEN
            }
        }).then(res => {
            setCheckListData(res.data);
            console.log('from api', res.data)
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
            setError(err);
        })
    }, [useGetChecklist, checklistId])
    return ({ checkListData, setCheckListData, loading, error })
}

export default useGetChecklist