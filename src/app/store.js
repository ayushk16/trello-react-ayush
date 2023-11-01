import { configureStore } from "@reduxjs/toolkit";

import boardsReducer from '../features/boards/boardsSlice.js';
import boardReducer from '../features/boards/boardSlice.js';


const store = configureStore({
    reducer: {
        boards: boardsReducer,
        board: boardReducer,
    }
})

export default store;