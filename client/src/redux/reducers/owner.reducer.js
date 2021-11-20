import { createSlice } from '@reduxjs/toolkit';
import { generateID } from '../../helpers/idGenerator.helper';
import { findCatById } from '../../helpers/catManipulations';

const MAX_SLOTS_COUNT = 4;

const initialState = {
    id: generateID(),
    happyCatCoins: 100.0,
    flat: {
        flat_img: 'apartment',
        isWindowOpen: false,
        impurity: 0,
        smell: 0,
    },
    cats: [],
    toilets: [{ id: '0', slots: MAX_SLOTS_COUNT, toilet_img: 'toilet_empty' }],
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
        addToilet: (state, action) => {},
        setHappyCatCoins: (state, { payload: { newValue } }) => {
            state = { ...state, happyCatCoins: newValue };

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
        cleanToilets: (state, _) => {
            const cleanedToilets = state.toilets.map((toilet) => ({
                ...toilet,
                slots: MAX_SLOTS_COUNT,
                toilet_img: 'toilet_empty',
            }));

            state = {
                ...state,
                toilets: cleanedToilets,
            };

            return state;
        },
        poopInToilet: (state, _) => {
            const usedToilets = state.toilets.map((toilet) => ({
                ...toilet,
                slots: toilet.slots !== 0 ? toilet.slots - 1 : 0,
            }));

            const changedImg = usedToilets.map((toilet) => ({
                ...toilet,
                toilet_img:
                    toilet.slots === MAX_SLOTS_COUNT
                        ? 'toilet_empty'
                        : toilet.slots === 0
                        ? 'toilet_full'
                        : 'toilet_used',
            }));

            state = {
                ...state,
                toilets: changedImg,
            };

            return state;
        },
        poopOnCarpet: (state, _) => {
            state = {
                ...state,
                flat: {
                    ...state.flat,
                    impurity: state.flat.impurity + 1,
                    flat_img: !state.flat.isWindowOpen
                        ? 'apartment_dirty'
                        : 'apartment_dirty_openwindow',
                },
            };
            return state;
        },
        setSmell: (state, { payload }) => {
            state = {
                ...state,
                flat: {
                    ...state.flat,
                    smell: payload,
                },
            };

            return state;
        },
        cleanRoom: (state, _) => {
            state = {
                ...state,
                flat: {
                    ...state.flat,
                    impurity: 0,
                    flat_img: !state.flat.isWindowOpen
                        ? 'apartment'
                        : 'apartment_openwindow',
                },
            };

            return state;
        },
        airRoom: (state, _) => {
            state = {
                ...state,
                flat: {
                    ...state.flat,
                    isWindowOpen: !state.flat.isWindowOpen,
                },
            };

            state = {
                ...state,
                flat: {
                    ...state.flat,
                    flat_img:
                        state.flat.isWindowOpen && state.flat.impurity > 0
                            ? 'apartment_dirty_openwindow'
                            : !state.flat.isWindowOpen &&
                              state.flat.impurity > 0
                            ? 'apartment_dirty'
                            : !state.flat.isWindowOpen &&
                              state.flat.impurity === 0
                            ? 'apartment'
                            : 'apartment_openwindow',
                },
            };
            return state;
        },
    },
});

export const {
    addCat,
    addToilet,
    setHappyCatCoins,
    setFoodLevel,
    setHealthLevel,
    setMoodLevel,
    setDigestionLevel,
    feedCat,
    petCat,
    cleanToilets,
    poopInToilet,
    poopOnCarpet,
    setSmell,
    cleanRoom,
    airRoom,
} = reducer.actions;
export const ownerReducer = reducer.reducer;
