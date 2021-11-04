import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    intervalId: 0,
};

const reducer = createSlice({
    name: 'interval',
    initialState,
    reducers: {
        setIntervalId: (state, { payload }) => {
            state = { intervalId: payload };

            return state;
        },
    },
});

export const { setIntervalId } = reducer.actions;
export const intervalReducer = reducer.reducer;
