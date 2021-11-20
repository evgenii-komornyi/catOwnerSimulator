import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSound: true,
    sound: '',
};

const reducer = createSlice({
    name: 'sound',
    initialState,
    reducers: {
        setIsSound: (state, { payload }) => {
            state = { isSound: !state.isSound };

            return state;
        },
        setSound: (state, payload) => {
            state = { ...state, sound: payload };

            return state;
        },
    },
});

export const { setIsSound } = reducer.actions;
export const soundReducer = reducer.reducer;
