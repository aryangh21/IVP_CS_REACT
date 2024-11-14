import { createSlice } from '@reduxjs/toolkit';

// src/redux/stockSlice.js

const initialState = {
    ticker: '',
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setTicker: (state, action) => {
            state.ticker = action.payload;
        },
    },
});

export const { setTicker } = stockSlice.actions;

export default stockSlice.reducer;