import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRefCreate } from './hooks/useRefCreate';

import {
    setHappyCatCoins,
    setFoodLevel,
    setHealthLevel,
    setMoodLevel,
    setDigestionLevel,
    poopInToilet,
    poopOnCarpet,
    setSmell,
} from './redux/reducers/owner.reducer';

import { setIntervalId } from './redux/reducers/interval.reducer';

import Modal from './components/modal/modal.component';

import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material';

import Header from './components/header/header.component';
import MainPage from './pages/main.page';

import { MAX_FLAT_SMELL, MAX_HEALTH_LEVEL } from './helpers/max_values';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

let startGame;

const App = () => {
    const { happyCatCoins, cats, toilets, flat } = useSelector(
        (state) => state.owner
    );
    const { intervalId } = useSelector((state) => state.interval);

    const dispatch = useDispatch();

    const currentHappyCatCoins = useRefCreate(happyCatCoins);
    const currentCats = useRefCreate(cats);
    const currentToilets = useRefCreate(toilets);
    const currentFlat = useRefCreate(flat);

    const timer = 15;

    const startGameHandler = () => {
        startGame = setInterval(() => {
            currentCats.current.length !== 0 &&
                currentCats.current.map((cat) => {
                    if (cat.foodLevel > 0) {
                        if (
                            cat.foodLevel > 50 &&
                            cat.healthLevel < MAX_HEALTH_LEVEL
                        ) {
                            dispatch(
                                setHealthLevel({
                                    id: cat.id,
                                    newHealthLevel:
                                        cat.healthLevel + 5 > MAX_HEALTH_LEVEL
                                            ? MAX_HEALTH_LEVEL
                                            : cat.healthLevel + 5,
                                })
                            );
                        }

                        dispatch(
                            setFoodLevel({
                                id: cat.id,
                                newFoodLevel:
                                    cat.foodLevel - 1 < 0
                                        ? 0
                                        : cat.foodLevel - 1,
                            })
                        );
                    } else {
                        dispatch(
                            setHealthLevel({
                                id: cat.id,
                                newHealthLevel:
                                    cat.healthLevel - 1 < 0
                                        ? 0
                                        : cat.healthLevel - 1,
                            })
                        );
                    }
                    dispatch(
                        setDigestionLevel({
                            id: cat.id,
                            newDigestionLevel:
                                cat.digestionLevel - 1 < 0
                                    ? 0
                                    : cat.digestionLevel - 1,
                        })
                    );

                    if (
                        cat.moodLevel > 0 &&
                        cat.foodLevel > 0 &&
                        cat.healthLevel > 0
                    ) {
                        dispatch(
                            setHappyCatCoins({
                                newValue: currentHappyCatCoins.current + 0.15,
                            })
                        );
                    }

                    let isCatPooped = false;
                    if (cat.digestionLevel === 1) {
                        currentToilets.current.forEach((toilet) => {
                            if (toilet.slots !== 0) {
                                dispatch(poopInToilet());
                                isCatPooped = true;
                                return;
                            }
                        });

                        if (!isCatPooped) dispatch(poopOnCarpet());
                    }

                    dispatch(
                        setMoodLevel({
                            id: cat.id,
                            newMoodLevel:
                                cat.moodLevel - 1 < 0 ? 0 : cat.moodLevel - 1,
                        })
                    );

                    return cat;
                });

            if (currentFlat.current.impurity !== 0) {
                dispatch(
                    setSmell(
                        currentFlat.current.smell +
                            currentFlat.current.impurity >
                            MAX_FLAT_SMELL
                            ? MAX_FLAT_SMELL
                            : currentFlat.current.smell +
                                  currentFlat.current.impurity
                    )
                );
            }

            if (currentFlat.current.isWindowOpen) {
                dispatch(
                    setSmell(
                        currentFlat.current.smell - 2 < 0
                            ? 0
                            : currentFlat.current.smell - 2
                    )
                );
            }
        }, timer * 1000);
        dispatch(setIntervalId(startGame));
    };

    const stopGameHandler = () => {
        clearInterval(intervalId);
        dispatch(setIntervalId(0));
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header startGame={startGameHandler} stopGame={stopGameHandler} />
            <MainPage startGame={startGameHandler} />
            <Modal />
        </ThemeProvider>
    );
};

export default App;
