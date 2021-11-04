import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const reducer = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setIsOpen: (state, { payload }) => {
            state = { isOpen: !state.isOpen };

            return state;
        },
    },
});

export const { setIsOpen } = reducer.actions;
export const modalReducer = reducer.reducer;
