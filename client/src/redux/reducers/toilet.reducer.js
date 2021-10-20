import { createSlice } from '@reduxjs/toolkit';

const MAX_SLOTS_COUNT = 10;

const initialState = {
    id: null,
    slots: MAX_SLOTS_COUNT,
    toilet_full: 'toilet_full',
    toilet_empty: 'toilet_empty',
    toilet_used: 'toilet_used',
};

const reducer = createSlice({
    name: 'toilet',
    initialState,
    reducers: {
        clean: (state, { payload }) => {
            state = { ...state, slots: MAX_SLOTS_COUNT };

            return state;
        },
        getShit: (state, { payload }) => {},
    },
});

export const { clean, getShit } = reducer.actions;
export const toiletReducer = reducer.reducer;
