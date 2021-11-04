import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRefCreate } from './hooks/useRefCreate';

import {
    setFoodLevel,
    setHealthLevel,
    setMoodLevel,
    setDigestionLevel,
} from './redux/reducers/owner.reducer';

import { setIntervalId } from './redux/reducers/interval.reducer';

import Modal from './components/modal/modal.component';

import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material';

import Header from './components/header/header.component';
import MainPage from './pages/main.page';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

let startGame;

const App = () => {
    const { cats } = useSelector((state) => state.owner);
    const { intervalId } = useSelector((state) => state.interval);

    const dispatch = useDispatch();

    const currentCats = useRefCreate(cats);

    const startGameHandler = () => {
        startGame = setInterval(() => {
            currentCats.current.length !== 0 &&
                currentCats.current.map((cat) => {
                    if (cat.foodLevel > 0) {
                        if (cat.foodLevel > 50 && cat.healthLevel < 100) {
                            dispatch(
                                setHealthLevel({
                                    id: cat.id,
                                    newHealthLevel:
                                        cat.healthLevel + 5 > 100
                                            ? 100
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

                    // if (cat.digestionLevel === 1) {
                    //     dispatch(getShit(cat.digestionLevel));
                    // }
                    dispatch(
                        setMoodLevel({
                            id: cat.id,
                            newMoodLevel:
                                cat.moodLevel - 5 < 0 ? 0 : cat.moodLevel - 5,
                        })
                    );
                    return cat;
                });
        }, 1000);
        dispatch(setIntervalId(startGame));
    };

    const stopGameHandler = () => {
        clearInterval(intervalId);
        dispatch(setIntervalId(0));
    };

    // const feed = () => {
    //     dispatch(
    //         setFoodLevel(
    //             currentFood.current + 5 > 100
    //                 ? (currentFood.current = 100)
    //                 : currentFood.current + 5
    //         )
    //     );

    //     dispatch(
    //         setDigestionLevel(
    //             currentDigestion.current <= 0
    //                 ? (currentDigestion.current = 30)
    //                 : currentDigestion.current
    //         )
    //     );
    // };

    // const petCat = () => {
    //     dispatch(setMoodLevel(100));
    // };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header startGame={startGameHandler} stopGame={stopGameHandler} />
            <MainPage />
            <Modal />
        </ThemeProvider>
    );
};

export default App;
