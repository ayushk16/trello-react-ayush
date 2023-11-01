import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: '',
    data: [],
};

export const fetchBoards = createAsyncThunk('boards/fetchBoards', () => {
    return axios({
        method: 'GET',
        url: `https://api.trello.com/1/members/me/boards`,
        params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            return res.data;
        })
})

export const addBoard = createAsyncThunk('boards/addBoard', (value) => {
    return axios({
        method: 'POST',
        url: `https://api.trello.com/1/boards/`,
        params: {
            name: value,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN,
        },
    })
        .then((res) => {
            return res.data;
        })
})

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchBoards.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchBoards.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = ''
        })
        builder.addCase(fetchBoards.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = 'Something went wrong ';
        })
        builder.addCase(addBoard.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addBoard.fulfilled, (state, action) => {
            state.loading = false;
            state.data.push(action.payload);
            state.error = '';
        })
        builder.addCase(addBoard.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Something went while adding board try again.';
        })
    }
})

export default boardsSlice.reducer;