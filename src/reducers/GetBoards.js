import { useEffect, useReducer } from 'react';
import axios from 'axios';

export const ACTION = {
  FETCHBOARD: {
    SUCCESS: 'FETCH_SUCCESS',
    ERROR: 'FETCH_ERROR',
  },
  ADDBOARD: {
    SUCCESS: 'ADD_SUCCESS',
    ERROR: 'ADD_ERROR',
  },
};

const initialState = {
  loading: true,
  error: '',
  data: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.FETCHBOARD.SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };
    case ACTION.FETCHBOARD.ERROR:
      return {
        loading: false,
        data: [],
        error: 'Something went wrong ',
      };
    case ACTION.ADDBOARD.SUCCESS:
      return {
        loading: false,
        data: [...state.data, action.payload],
        error: '',
      };
    case ACTION.ADDBOARD.ERROR:
      return {
        loading: false,
        data: state.data,
        error: 'Something went while adding board try again.',
      };
    default:
      return state;
  }
};

const useGetBoards = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios({
      method: 'Get',
      url: `https://api.trello.com/1/members/me/boards`,
      params: {
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_TOKEN,
      },
    })
      .then((res) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      })
      .catch((err) => {
        console.log('error in getBoards in reducers', err);
        dispatch({ type: 'FETCH_ERROR' });
      });
  }, []);

  return { state, dispatch };
};

export default useGetBoards;
