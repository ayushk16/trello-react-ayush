import { configureStore } from "@reduxjs/toolkit";

import boardsReducer from '../features/boards/boardsSlice.js';
import boardReducer from '../features/boards/boardSlice.js';
import listReducer from '../features/lists/listsSlice.js';


const store = configureStore({
    reducer: {
        boards: boardsReducer,
        board: boardReducer,
        lists: listReducer,
    }
})

export default store;