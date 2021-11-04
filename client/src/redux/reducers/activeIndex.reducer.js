import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeIndex: 0,
};

const reducer = createSlice({
    name: 'activeIndex',
    initialState,
    reducers: {
        setActiveIndex: (state, { payload }) => {
            state = { activeIndex: payload };

            return state;
        },
    },
});

export const { setActiveIndex } = reducer.actions;
export const activeIndexReducer = reducer.reducer;
