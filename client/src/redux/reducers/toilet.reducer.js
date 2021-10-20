import { createSlice } from '@reduxjs/toolkit';

const MAX_SLOTS_COUNT = 4;

const initialState = {
    id: null,
    slots: MAX_SLOTS_COUNT,
    toilet_img: 'toilet_empty',
};

const reducer = createSlice({
    name: 'toilet',
    initialState,
    reducers: {
        setToilet: (state, { payload }) => {
            state = {
                ...state,
                id: payload.id,
            };

            return state;
        },
        clean: (state, { payload }) => {
            state = {
                ...state,
                slots: MAX_SLOTS_COUNT,
                toilet_img: 'toilet_empty',
            };

            return state;
        },
        getShit: (state, { payload }) => {
            state = {
                ...state,
                slots: state.slots !== 0 ? state.slots - 1 : 0,
            };

            state = {
                ...state,
                toilet_img:
                    state.slots === MAX_SLOTS_COUNT
                        ? 'toilet_empty'
                        : state.slots === 0
                        ? 'toilet_full'
                        : 'toilet_used',
            };

            return state;
        },
    },
});

export const { setToilet, clean, getShit } = reducer.actions;
export const toiletReducer = reducer.reducer;
