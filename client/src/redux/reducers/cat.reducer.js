import { createSlice } from '@reduxjs/toolkit';

const MAX_FOOD_LEVEL = 100;
const MAX_HEALTH_LEVEL = 100;
const MAX_MOOD_LEVEL = 100;
const MAX_DIGESTION_LEVEL = 30;

const initialState = {
    id: null,
    name: null,
    img: null,
    foodLevel: MAX_FOOD_LEVEL,
    healthLevel: MAX_HEALTH_LEVEL,
    moodLevel: MAX_MOOD_LEVEL,
    digestionLevel: MAX_DIGESTION_LEVEL,
};

const reducer = createSlice({
    name: 'cat',
    initialState,
    reducers: {
        createCat: (state, { payload: { id, name, img } }) => {
            state = {
                ...state,
                id: id,
                name: name,
                img: img,
            };

            return state;
        },
        setFoodLevel: (state, { payload }) => {
            state = {
                ...state,
                foodLevel: payload,
            };

            return state;
        },
        setHealthLevel: (state, { payload }) => {
            state = {
                ...state,
                healthLevel: payload,
            };

            return state;
        },
        setMoodLevel: (state, { payload }) => {
            state = {
                ...state,
                moodLevel: payload,
            };

            return state;
        },
        setDigestionLevel: (state, { payload }) => {
            state = {
                ...state,
                digestionLevel: payload,
            };

            return state;
        },
    },
});

export const {
    createCat,
    setFoodLevel,
    setHealthLevel,
    setMoodLevel,
    setDigestionLevel,
} = reducer.actions;
export const catReducer = reducer.reducer;
