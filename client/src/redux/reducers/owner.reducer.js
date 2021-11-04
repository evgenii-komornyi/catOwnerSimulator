import { createSlice } from '@reduxjs/toolkit';
import { generateID } from '../../helpers/idGenerator.helper';

const initialState = {
    id: generateID(),
    happyCatCoins: 100,
    cats: [],
};

const reducer = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        addCat: (state, { payload }) => {
            state = {
                ...state,
                cats: [...state.cats, payload],
            };

            return state;
        },
        setFoodLevel: (state, { payload: { id, newFoodLevel } }) => {
            let cat = state.cats.find((cat) => cat.id === id);

            cat.foodLevel = newFoodLevel;

            return state;
        },
        setHealthLevel: (state, { payload: { id, newHealthLevel } }) => {
            const cat = state.cats.find((cat) => cat.id === id);

            cat.healthLevel = newHealthLevel;

            return state;
        },
        setMoodLevel: (state, { payload: { id, newMoodLevel } }) => {
            const cat = state.cats.find((cat) => cat.id === id);

            cat.moodLevel = newMoodLevel;

            return state;
        },
        setDigestionLevel: (state, { payload: { id, newDigestionLevel } }) => {
            const cat = state.cats.find((cat) => cat.id === id);

            cat.digestionLevel = newDigestionLevel;

            return state;
        },
    },
});

export const {
    addCat,
    setFoodLevel,
    setHealthLevel,
    setMoodLevel,
    setDigestionLevel,
} = reducer.actions;
export const ownerReducer = reducer.reducer;
