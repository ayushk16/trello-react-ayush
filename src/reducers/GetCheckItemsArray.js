import { useEffect, useReducer } from 'react'
import axios from 'axios';

export const ACTION = {
    FETCHCHECKITEMS: {
        SUCCESS: 'FETCH_SUCCESS',
        ERROR: 'FETCH_ERROR',
    },
    ADDCHECKITEMS: {
        SUCCESS: 'ADD_SUCCESS',
        ERROR: 'ADD_ERROR',
    },
    DELETECHECKITEMS: {
        SUCCESS: 'DELETE_SUCCESS',
        ERROR: 'DELETE_ERROR',
    },
    EDITCHECKITEMS: {
        SUCCESS: 'EDIT_SUCCESS',
        ERROR: 'EDIT_ERROR',
    }
}

const initialState = {
    loading: true,
    data: [],
    error: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION.FETCHCHECKITEMS.SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
            }
        case ACTION.FETCHCHECKITEMS.ERROR:
            return {
                loading: false,
                data: [],
                error: 'Something went wrong while fetching checkitem ',
            }

        case ACTION.ADDCHECKITEMS.SUCCESS:
            return {
                loading: false,
                data: [...state.data, action.payload],
                error: null,
            }
        case ACTION.ADDCHECKITEMS.ERROR:
            return {
                loading: false,
                data: state.data,
                error: 'Something went wrong while adding checkitem try again',
            }

        case ACTION.DELETECHECKITEMS.SUCCESS:
            return {
                loading: false,
                data: state.data.filter((checkItem) => {
                    return checkItem.id !== action.payload;
                }),
                error: null,
            }
        case ACTION.DELETECHECKITEMS.ERROR:
            return {
                loading: false,
                data: state.data,
                error: 'Something went wrong while deleting checkitem try again',
            }
        case ACTION.EDITCHECKITEMS.SUCCESS:
            return {
                loading: false,
                data: state.data.map((checkItem) => {
                    if (checkItem.id === action.payload.id) {
                        return action.payload;
                    }
                    return checkItem;
                })
            }
        case ACTION.EDITCHECKITEMS.ERROR:
            console.log('error,in edit checkitem reducer')
            return {
                loading: false,
                data: state.data,
                error: 'Something went wrong while editing checkitem try again',
            }
        default:
            console.log('default called')
            return state;
    }
}


const useGetCheckItemsArray = (checkListId) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios({
            method: "GET",
            url: `https://api.trello.com/1/checklists/${checkListId}/checkItems`,
            params: {
                key: import.meta.env.VITE_API_KEY,
                token: import.meta.env.VITE_TOKEN
            }
        }).then(res => {
            dispatch({ type: ACTION.FETCHCHECKITEMS.SUCCESS, payload: res.data });
        }).catch(err => {
            console.log('error in getCheckItemsArray in reducers', err);
            dispatch({ type: ACTION.FETCHCHECKITEMS.ERROR });
        })
    }, [])

    return { state, dispatch }

}

export default useGetCheckItemsArray;
