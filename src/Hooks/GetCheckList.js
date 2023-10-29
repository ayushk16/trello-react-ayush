import { useState, useEffect } from 'react'
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
            setLoading(false);
        }).catch(err => {
            console.log('error in GetCheckList in hooks', err);
            setLoading(false);
            setError(err);
        })
    }, [useGetChecklist, checklistId, setCheckListData])
    return ({ checkListData, setCheckListData, loading, error })
}

export default useGetChecklist