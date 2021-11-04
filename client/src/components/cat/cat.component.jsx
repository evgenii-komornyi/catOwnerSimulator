import React, { useState, useEffect, useRef } from 'react';
import { useRefCreate } from '../../hooks/useRefCreate';

import { useDispatch } from 'react-redux';

import { feedCat, petCat } from '../../redux/reducers/owner.reducer';

import {
    Card,
    Grid,
    CardContent,
    LinearProgress,
    Typography,
    IconButton,
} from '@mui/material';

import FullHeart from '../../icons/fullHeart.png';
import BrokenHeart from '../../icons/broken_heart.png';
import FullFood from '../../icons/food_full.png';
import EmptyFood from '../../icons/food_empty.png';
import FullMood from '../../icons/mood_full.png';
import EmptyMood from '../../icons/mood_empty.png';

import TombStone from '../../icons/tombstone.png';

import { useStyles } from './cat.styles';
import { PanTool, SetMeal } from '@mui/icons-material';

const Cat = ({ cat }) => {
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(false);

    const classes = useStyles(isVisible);

    const audioRef = useRef();

    const [audio, setAudio] = useState('');

    const currentAudio = useRefCreate(audio);

    useEffect(() => {
        const audioElement = audioRef.current;

        if (cat.digestionLevel <= 1) {
            setAudio('poo');

            if (audioRef.current) {
                audioElement.load();

                const playPromise = audioElement.play();
                if (playPromise) {
                    playPromise
                        .then((_) => {
                            return audioElement.play();
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }
            }
        }
        currentAudio.current !== '' &&
            audioElement.addEventListener('ended', () => {
                setAudio('');
            });
    }, [currentAudio, cat.digestionLevel]);

    const checkHealthLevel = () => {
        switch (true) {
            case cat.healthLevel > 0 && cat.healthLevel <= 100:
                return FullHeart;
            case cat.healthLevel <= 0:
                return BrokenHeart;
            default:
                break;
        }
    };

    const checkFoodLevel = () => {
        switch (true) {
            case cat.foodLevel > 0 && cat.foodLevel <= 100:
                return FullFood;
            case cat.foodLevel <= 0:
                return EmptyFood;
            default:
                break;
        }
    };

    const checkMoodLevel = () => {
        switch (true) {
            case cat.moodLevel !== 0 && cat.moodLevel <= 100:
                return FullMood;
            case cat.moodLevel === 0:
                return EmptyMood;
            default:
                break;
        }
    };

    return (
        <>
            <Card
                variant="elevation"
                sx={{ height: 315, p: 0 }}
                onMouseOver={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {cat.healthLevel <= 0 ? (
                    <img src={TombStone} width="100%" alt={cat.name} />
                ) : (
                    <>
                        <Typography variant="h6">{cat.name}</Typography>
                        <CardContent>
                            <Grid container item lg={12} spacing={2}>
                                <Grid item lg={12}>
                                    <img
                                        alt={cat.name}
                                        src={`${
                                            process.env.REACT_APP_HOST_IMG_URL
                                        }/cats/${
                                            cat.moodLevel !== 0
                                                ? cat.img
                                                : 'sad_' + cat.img
                                        }.png`}
                                        width="70%"
                                        className={classes.catAvatar}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={2}
                                    sx={{ textAlign: 'right', mt: -1 }}
                                >
                                    <img
                                        src={checkHealthLevel()}
                                        alt=""
                                        className={classes.healthIcon}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={10}
                                    sx={{
                                        textAlign: 'center',
                                    }}
                                >
                                    {cat.healthLevel > 0 && (
                                        <LinearProgress
                                            variant="determinate"
                                            value={Math.ceil(
                                                (cat.healthLevel * 100) / 100
                                            )}
                                            color={`${
                                                cat.healthLevel < 30
                                                    ? 'error'
                                                    : 'primary'
                                            }`}
                                            className={classes.progressBar}
                                        />
                                    )}
                                </Grid>
                                <Grid
                                    item
                                    lg={2}
                                    sx={{ textAlign: 'right', mt: -1 }}
                                >
                                    <img
                                        src={checkFoodLevel()}
                                        alt=""
                                        className={classes.foodIcon}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={10}
                                    sx={{
                                        textAlign: 'center',
                                    }}
                                >
                                    <LinearProgress
                                        variant="determinate"
                                        color={`${
                                            cat.foodLevel < 30
                                                ? 'error'
                                                : 'primary'
                                        }`}
                                        value={Math.ceil(
                                            (cat.foodLevel * 100) / 100
                                        )}
                                        className={classes.progressBar}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={2}
                                    sx={{ textAlign: 'right', mt: -1 }}
                                >
                                    <img
                                        src={checkMoodLevel()}
                                        alt=""
                                        className={classes.moodIcon}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={10}
                                    sx={{
                                        textAlign: 'center',
                                    }}
                                >
                                    <LinearProgress
                                        variant="determinate"
                                        color={`${
                                            cat.moodLevel < 30
                                                ? 'error'
                                                : 'primary'
                                        }`}
                                        value={Math.ceil(
                                            (cat.moodLevel * 100) / 100
                                        )}
                                        className={classes.progressBar}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Grid container className={classes.actions}>
                            <Grid item lg={4}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        textAlign: 'center',
                                    }}
                                >
                                    <CardContent>
                                        <IconButton
                                            color="success"
                                            size="large"
                                            aria-label="feed"
                                            onClick={() =>
                                                dispatch(
                                                    feedCat({
                                                        id: cat.id,
                                                        newFoodLevel:
                                                            cat.foodLevel + 5 >
                                                            100
                                                                ? 100
                                                                : cat.foodLevel +
                                                                  5,
                                                    })
                                                )
                                            }
                                        >
                                            <SetMeal />
                                        </IconButton>{' '}
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item lg={4}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        textAlign: 'center',
                                    }}
                                >
                                    <CardContent>
                                        <IconButton
                                            color="primary"
                                            size="large"
                                            aria-label="feed"
                                            onClick={() =>
                                                dispatch(
                                                    petCat({
                                                        id: cat.id,
                                                        newMoodLevel:
                                                            cat.moodLevel + 10 >
                                                            100
                                                                ? 100
                                                                : cat.moodLevel +
                                                                  10,
                                                    })
                                                )
                                            }
                                        >
                                            <PanTool />
                                        </IconButton>{' '}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Card>
            {currentAudio.current !== '' && (
                <audio ref={audioRef}>
                    <source
                        src={`${process.env.REACT_APP_HOST_AUDIO_URL}/${currentAudio.current}.mp3`}
                        type="audio/mpeg"
                    />
                </audio>
            )}
        </>
    );
};

export default Cat;
