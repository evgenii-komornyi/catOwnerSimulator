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
    },
});

export const { createCat } = reducer.actions;
export const catReducer = reducer.reducer;
