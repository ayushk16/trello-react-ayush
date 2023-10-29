import { useEffect, useReducer } from 'react';
import axios from 'axios';

export const ACTION = {
    FETCHCHECKITEM: {
        SUCCESS: 'FETCH_SUCCESS',
        ERROR: 'FETCH_ERROR',
    },
    EDITCHECKITEM: {
        SUCCESS: 'EDIT_SUCCESS',
        ERROR: 'EDIT_ERROR',
    }
};

const initialState = {
    loading: true,
    error: null,
    data: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION.FETCHCHECKITEM.SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
            }

        case ACTION.FETCHCHECKITEM.ERROR:
            return {
                loading: false,
                data: [],
                error: 'Something went wrong while fetching CheckItem ',
            }
        case ACTION.EDITCHECKITEM.SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
            }
        case ACTION.EDITCHECKITEM.ERROR:
            return {
                loading: false,
                data: [],
                error: 'Something went wrong while editing CheckItem ',
            }
        default:
            return state;
    }
}

const useGetCheckItem = (checkListId, checkItemId) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

        axios({
            method: "GET",
            url: `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}`,
            params: {
                key: import.meta.env.VITE_API_KEY,
                token: import.meta.env.VITE_TOKEN
            }
        }).then(res => {
            dispatch({ type: ACTION.FETCHCHECKITEM.SUCCESS, payload: res.data })
        }).catch(err => {
            console.log('error in getCheckItem in reducers', err);
            dispatch({ type: ACTION.FETCHCHECKITEM.ERROR })
        })
    }, [checkItemId, checkListId])

    return { state, dispatch };
}

export default useGetCheckItem;