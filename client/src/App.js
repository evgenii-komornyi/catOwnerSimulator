import React, { useState, useCallback } from 'react';
import { useRefCreate } from './hooks/useRefCreate';

import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material';

import MainPage from './pages/main.page';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const MAX_FOOD_LEVEL = 100;
const MAX_HEALTH_LEVEL = 100;

let startGame;

const App = () => {
    const [catName, setCatName] = useState(null);

    const [foodLevel, setFoodLevel] = useState(MAX_FOOD_LEVEL);
    const [healthLevel, setHealthLevel] = useState(MAX_HEALTH_LEVEL);

    const currentFood = useRefCreate(foodLevel);
    const currentHealth = useRefCreate(healthLevel);

    const [intervalId, setIntervalId] = useState(0);

    const checkZeroFoodLevel = useCallback(() => {
        return currentFood.current <= 0;
    }, [currentFood]);

    const tick = () => {
        startGame = setInterval(() => {
            if (!checkZeroFoodLevel()) {
                setFoodLevel((prevFoodLevel) => prevFoodLevel - 1);
                if (currentFood.current > 50 && currentHealth.current < 100) {
                    setHealthLevel((prev) =>
                        prev + 5 > 100 ? (prev = 100) : prev + 5
                    );
                }
            } else {
                setHealthLevel((prev) => prev - 1);
            }
        }, 100);

        setIntervalId(startGame);
    };

    if (currentHealth.current === 0) {
        clearInterval(intervalId);
    }

    const feed = () => {
        setFoodLevel((prev) => (prev + 5 > 100 ? (prev = 100) : prev + 5));
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <MainPage
                catName={catName}
                setCatName={setCatName}
                tick={tick}
                healthLevel={healthLevel}
                currentFood={currentFood}
                currentHealth={currentHealth}
                feed={feed}
            />
        </ThemeProvider>
    );
};

export default App;
