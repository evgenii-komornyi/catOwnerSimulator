import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRefCreate } from './hooks/useRefCreate';

import {
    setFoodLevel,
    setHealthLevel,
    setMoodLevel,
    setDigestionLevel,
} from './redux/reducers/cat.reducer';

import { getShit } from './redux/reducers/toilet.reducer';

import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material';

import MainPage from './pages/main.page';
import WhatNew from './components/whatNew/whatNew.component';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

let startGame;

const App = () => {
    const { foodLevel, healthLevel, moodLevel, digestionLevel } = useSelector(
        (state) => state.cat
    );
    const dispatch = useDispatch();

    const currentFood = useRefCreate(foodLevel);
    const currentHealth = useRefCreate(healthLevel);
    const currentMood = useRefCreate(moodLevel);
    const currentDigestion = useRefCreate(digestionLevel);

    const [intervalId, setIntervalId] = useState(0);

    const checkZeroFoodLevel = useCallback(() => {
        return currentFood.current <= 0;
    }, [currentFood]);

    const tick = () => {
        startGame = setInterval(() => {
            if (!checkZeroFoodLevel()) {
                dispatch(setFoodLevel(currentFood.current - 1));

                if (currentFood.current > 50 && currentHealth.current < 100) {
                    dispatch(
                        setHealthLevel(
                            currentHealth.current + 5 > 100
                                ? (currentHealth.current = 100)
                                : currentHealth.current + 5
                        )
                    );
                }
            } else {
                dispatch(setHealthLevel(currentHealth.current - 1));
            }

            dispatch(
                setDigestionLevel(
                    currentDigestion.current > 0
                        ? currentDigestion.current - 1
                        : currentDigestion.current
                )
            );

            if (currentDigestion.current === 1) {
                dispatch(getShit(currentDigestion.current));
            }

            dispatch(setMoodLevel(currentMood.current - 5));
        }, 1000);

        setIntervalId(startGame);
    };

    if (currentHealth.current === 0) {
        clearInterval(intervalId);
    }

    const feed = () => {
        dispatch(
            setFoodLevel(
                currentFood.current + 5 > 100
                    ? (currentFood.current = 100)
                    : currentFood.current + 5
            )
        );

        dispatch(
            setDigestionLevel(
                currentDigestion.current <= 0
                    ? (currentDigestion.current = 30)
                    : currentDigestion.current
            )
        );
    };

    const petCat = () => {
        dispatch(setMoodLevel(100));
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <MainPage tick={tick} feed={feed} petCat={petCat} />
            <WhatNew />
        </ThemeProvider>
    );
};

export default App;
