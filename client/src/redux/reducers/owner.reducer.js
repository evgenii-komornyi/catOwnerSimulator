import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    name: null,
    money: 100.0,
    cats: [],
    toilets: [],
    items: [],
};

const reducer = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        setOwner: (state, { payload }) => {},
        feedCat: (state, { payload }) => {},
        petCat: (state, { payload }) => {},
        cleanToilet: (state, { payload }) => {},
        addCat: (state, { payload }) => {},
        addToilet: (state, { payload }) => {},
        addItem: (state, { payload }) => {},
    },
});

export const {
    setOwner,
    feedCat,
    petCat,
    cleanToilet,
    addCat,
    addToilet,
    addItem,
} = reducer.actions;
export const ownerReducer = reducer.reducer;
