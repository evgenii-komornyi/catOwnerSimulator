import { createSlice } from '@reduxjs/toolkit';

const MAX_FOOD_LEVEL = 100;
const MAX_HEALTH_LEVEL = 100;
const MAX_MOOD_LEVEL = 100;

const initialState = {
    cat: {
        name: null,
        img: null,
        foodLevel: MAX_FOOD_LEVEL,
        healthLevel: MAX_HEALTH_LEVEL,
        moodLevel: MAX_MOOD_LEVEL,
    },
};

const reducer = createSlice({
    name: 'cat',
    initialState,
    reducers: {
        createCat: (state, { payload: { name, img } }) => {
            state = {
                cat: {
                    ...state.cat,
                    name: name,
                    img: img,
                },
            };

            return state;
        },
        setFoodLevel: (state, { payload }) => {
            state = {
                cat: {
                    ...state.cat,
                    foodLevel: payload,
                },
            };

            return state;
        },
        setHealthLevel: (state, { payload }) => {
            state = {
                cat: { ...state.cat, healthLevel: payload },
            };

            return state;
        },
        setMoodLevel: (state, { payload }) => {
            state = {
                cat: { ...state.cat, moodLevel: payload },
            };

            return state;
        },
    },
});

export const { createCat, setFoodLevel, setHealthLevel, setMoodLevel } =
    reducer.actions;
export const catReducer = reducer.reducer;
