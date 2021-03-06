import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSound: true,
    volume: 50,
    sound: '',
};

const reducer = createSlice({
    name: 'sound',
    initialState,
    reducers: {
        setIsSound: (state, { payload }) => {
            state = { ...state, isSound: !state.isSound };

            return state;
        },
        setVolume: (state, { payload }) => {
            state = { ...state, volume: payload };

            return state;
        },
        setSound: (state, { payload }) => {
            state = { ...state, sound: payload };

            return state;
        },
    },
});

export const { setIsSound, setVolume, setSound } = reducer.actions;
export const soundReducer = reducer.reducer;
