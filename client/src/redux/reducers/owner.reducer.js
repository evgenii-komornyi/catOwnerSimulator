import { createSlice } from '@reduxjs/toolkit';
import { generateID } from '../../helpers/idGenerator.helper';
import { findCatById } from '../../helpers/catManipulations';

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
            const cat = findCatById(state.cats, id);

            cat.foodLevel = newFoodLevel;

            return state;
        },
        setHealthLevel: (state, { payload: { id, newHealthLevel } }) => {
            const cat = findCatById(state.cats, id);

            cat.healthLevel = newHealthLevel;

            return state;
        },
        setMoodLevel: (state, { payload: { id, newMoodLevel } }) => {
            const cat = findCatById(state.cats, id);

            cat.moodLevel = newMoodLevel;

            return state;
        },
        setDigestionLevel: (state, { payload: { id, newDigestionLevel } }) => {
            const cat = findCatById(state.cats, id);

            cat.digestionLevel = newDigestionLevel;

            return state;
        },
        feedCat: (state, { payload: { id, newFoodLevel } }) => {
            const cat = findCatById(state.cats, id);

            cat.foodLevel = newFoodLevel;

            return state;
        },
        petCat: (state, { payload: { id, newMoodLevel } }) => {
            const cat = findCatById(state.cats, id);

            cat.moodLevel = newMoodLevel;

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
    feedCat,
    petCat,
} = reducer.actions;
export const ownerReducer = reducer.reducer;
