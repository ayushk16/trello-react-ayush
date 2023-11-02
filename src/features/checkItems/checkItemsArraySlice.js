import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: true,
    data: [],
    error: null,
}

export const fetchCheckItems = createAsyncThunk('checkItemsArray/fetchCheckItems', ({ cardId }) => {

})


const checkItemsArraySlice = createSlice({
    name: 'checkItemsArray',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchCheckItems.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchCheckItems.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(fetchCheckItems.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = 'Something went wrong while fetching checkitem ';
        })

        builder.addCase(addCheckItems.pending, state => {
            state.loading = true;
        })
        builder.addCase(addCheckItems.fulfilled, (state, action) => {
            state.loading = false;
            state.data = [...state.data, action.payload];
            state.error = null;
        })
        builder.addCase(addCheckItems.rejected, (state, action) => {
            state.loading = false;
            state.data = state.data;
            state.error = 'Something went wrong while adding checkitem try again';
        })

        builder.addCase(deleteCheckItems.pending, state => {
            state.loading = true;
        })
        builder.addCase(deleteCheckItems.fulfilled, (state, action) => {
            state.loading = false;
            state.data = state.data.filter((checkItem) => {
                return checkItem.id !== action.payload;
            })
            state.error = null;
        })
        builder.addCase(deleteCheckItems.rejected, (state, action) => {
            state.loading = false;
            state.data = state.data;
            state.error = 'Something went wrong while deleting checkitem try again';
        })

        builder.addCase(editCheckItems.pending, state => {
            state.loading = true;
        })
        builder.addCase(editCheckItems.fulfilled, (state, action) => {
            state.loading = false;
            state.data = state.data.map((checkItem) => {
                if (checkItem.id === action.payload.id) {
                    return action.payload;
                }
                else {
                    return checkItem;
                }
            })
            state.error = null;
        })
        builder.addCase(editCheckItems.rejected, (state, action) => {
            state.loading = false;
            state.data = state.data;
            state.error = 'Something went wrong while editing checkitem try again';
        })
    }
})

export default checkItemsArraySlice.reducer;