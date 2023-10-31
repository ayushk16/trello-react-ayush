import { useEffect, useReducer } from 'react';
import axios from 'axios';

export const ACTION = {
    FETCHCHECKLISTS: {
        SUCCESS: 'FETCH_SUCCESS',
        ERROR: 'FETCH_ERROR',
    },
    ADDCHECKLISTS: {
        SUCCESS: 'ADD_SUCCESS',
        ERROR: 'ADD_ERROR',
    },
    DELETECHECKLISTS: {
        SUCCESS: 'DELETE_SUCCESS',
        ERROR: 'DELETE_ERROR',
    }
};

const initialState = {
    loading: true,
    error: '',
    data: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION.FETCHCHECKLISTS.SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: '',
            };
        case ACTION.FETCHCHECKLISTS.ERROR:
            return {
                loading: false,
                data: [],
                error: 'Something went wrong ',
            };
        case ACTION.ADDCHECKLISTS.SUCCESS:
            return {
                loading: false,
                data: [...state.data, action.payload],
                error: '',
            };
        case ACTION.ADDCHECKLISTS.ERROR:
            return {
                loading: false,
                data: state.data,
                error: 'Something went while adding CHECKLIST try again.',
            };

        case ACTION.DELETECHECKLISTS.SUCCESS:
            return {
                loading: false,
                data: state.data.filter((checkList) => checkList.id !== action.payload)
            }

        case ACTION.DELETECHECKLISTS.ERROR:
            return {
                loading: false,
                data: state.data,
                error: 'Something went wrong while deleting CHECKLIST try again.',
            }
        default:
            return state;
    }
};

const useGetChecklists = (cardId) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios({
            method: "GET",
            url: `https://api.trello.com/1/cards/${cardId}/checklists`,
            params: {
                key: import.meta.env.VITE_API_KEY,
                token: import.meta.env.VITE_TOKEN
            }
        }).then(res => {
            console.log('checklists', res.data);
            dispatch({ type: ACTION.FETCHCHECKLISTS.SUCCESS, payload: res.data })
        }).catch(err => {
            console.log('error in getCheckLists in reducers', err);
            dispatch({ type: ACTION.FETCHCHECKLISTS.ERROR });
        })
    }, []);

    return { state, dispatch };
};

export default useGetChecklists;
