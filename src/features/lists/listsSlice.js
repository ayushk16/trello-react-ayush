import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    data: [],
    error: '',
}

export const fetchLists = createAsyncThunk('lists/fetchList', (boardId) => {
    return axios({
        method: "Get",
        url: `https://api.trello.com/1/boards/${boardId}/lists`,
        params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_TOKEN
        }
    }).then((res) => {
        return res.data
    })
})

const listSlice = createSlice({
    name: 'lists',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchLists.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = ''
        })
        builder.addCase(fetchLists.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = ''
        })
        builder.addCase(fetchLists.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error.message;
        })
    }
})

export default listSlice.reducer