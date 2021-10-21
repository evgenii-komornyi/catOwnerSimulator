import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRefCreate } from '../../hooks/useRefCreate';

import { motion } from 'framer-motion';

import {
    Card,
    Grid,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
    CardActions,
    Button,
} from '@mui/material';

import { clean } from '../../redux/reducers/toilet.reducer';

import FullHeart from '../../icons/fullHeart.png';
import BrokenHeart from '../../icons/broken-heart.png';
import Fish from '../../icons/fish.png';
import FishBones from '../../icons/fish-bone.png';
import TombStone from '../../icons/tombstone.png';

import { useStyles } from './cat.styles';

const Cat = ({ feed, petCat }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { name, img, foodLevel, healthLevel, moodLevel, digestionLevel } =
        useSelector((state) => state.cat);

    const { toilet_img } = useSelector((state) => state.toilet);

    const catId = useSelector((state) => state.cat.id);
    const toiletId = useSelector((state) => state.toilet.id);

    const currentFood = useRefCreate(foodLevel);
    const currentHealth = useRefCreate(healthLevel);
    const currentMood = useRefCreate(moodLevel);
    const currentDigestion = useRefCreate(digestionLevel);

    const audioRef = useRef();

    const [audio, setAudio] = useState('');
    const [gif, setGif] = useState('');

    useEffect(() => {
        if (currentDigestion.current <= 1) {
            setAudio('poo');
            setGif('use_toilet');

            if (audioRef.current) {
                audioRef.current.load();
                const playPromise = audioRef.current.play();
                if (playPromise) {
                    playPromise
                        .then((_) => {
                            return audioRef.current.play();
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }
            }
        }
        audioRef.current.addEventListener('ended', () => {
            setGif('');
            setAudio('');
        });
    }, [audio, currentDigestion.current]);
    const [warning, setWarning] = useState('');

    const checkFoodLevel = () => {
        switch (true) {
            case currentFood.current >= 30 && currentFood.current <= 100:
                return Fish;
            case currentFood.current >= 0 && currentFood.current < 30:
                return FishBones;
            default:
                break;
        }
    };

    const checkHealthLevel = () => {
        switch (true) {
            case currentHealth.current >= 30 && currentHealth.current <= 100:
                return FullHeart;
            case currentHealth.current >= 0 && currentHealth.current < 30:
                return BrokenHeart;
            default:
                break;
        }
    };

    const checkForWarnings = () => {
        if (currentFood.current === 100) {
            setWarning('Cat does not want to eat!');
        } else if (currentHealth.current === 0) {
            setWarning('You killed your cat :(');
        } else {
            setWarning('');
        }
    };

    useEffect(() => {
        checkForWarnings();
    }, [currentFood.current, currentHealth.current]);

    return (
        <Grid container>
            <Grid item lg={2} sx={{ textAlign: 'center' }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h4">{name}</Typography>
                        {currentHealth.current !== 0 ? (
                            <>
                                <img
                                    src={`https://komornyi.space/static/img/cat_project/img/cats/${
                                        currentMood.current > 50
                                            ? img
                                            : 'sad_' + img
                                    }.png`}
                                    width="100%"
                                    alt={name}
                                />
                                {gif === '' ? (
                                    <img
                                        src={`https://komornyi.space/static/img/cat_project/img/cats/${toilet_img}.png`}
                                        width="100%"
                                        alt=""
                                    />
                                ) : (
                                    <img
                                        src={`https://komornyi.space/static/img/cat_project/img/cats/actions/${gif}.gif`}
                                        width="100%"
                                        alt=""
                                    />
                                )}
                            </>
                        ) : (
                            <img src={TombStone} width="100%" alt={name} />
                        )}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item lg={10}>
                <Card variant="outlined">
                    <CardHeader
                        avatar={
                            <Avatar sx={{ backgroundColor: 'grey' }}>
                                {name[0]}
                            </Avatar>
                        }
                        title={name}
                    />
                    <CardContent>
                        <Grid container item lg={12} spacing={2}>
                            <Grid item lg={2} sx={{ textAlign: 'right' }}>
                                <motion.img
                                    src={checkHealthLevel()}
                                    alt=""
                                    animate={{
                                        opacity:
                                            currentHealth.current < 20 &&
                                            currentHealth.current !== 0
                                                ? [1, 0, 1, 0, 1]
                                                : [1, 1],
                                    }}
                                    transition={{
                                        duration: 1,
                                        ease: 'easeInOut',
                                        times: [0, 0.2, 0.5, 0.8, 1],
                                        loop: Infinity,
                                        repeatDelay: 1,
                                    }}
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
                                {currentHealth.current > 0 && (
                                    <div
                                        style={{
                                            width: `${currentHealth.current}%`,
                                            height: '2px',
                                            padding: '2px',
                                            background: '#fff',
                                        }}
                                    />
                                )}
                            </Grid>
                            <Grid item lg={2} sx={{ textAlign: 'right' }}>
                                <motion.img
                                    src={checkFoodLevel()}
                                    alt=""
                                    animate={{
                                        opacity:
                                            currentFood.current < 30 &&
                                            currentFood.current !== 0
                                                ? [1, 0, 1, 0, 1]
                                                : [1, 1],
                                    }}
                                    transition={{
                                        duration: 1,
                                        ease: 'easeInOut',
                                        times: [0, 0.2, 0.5, 0.8, 1],
                                        loop: Infinity,
                                        repeatDelay: 1,
                                    }}
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
                                {currentFood.current > 0 && (
                                    <div
                                        style={{
                                            width: `${currentFood.current}%`,
                                            height: '2px',
                                            padding: '2px',
                                            background: '#fff',
                                        }}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        {currentHealth.current !== 0 && (
                            <>
                                <Button variant="outlined" onClick={feed}>
                                    Feed {name}
                                </Button>
                                <Button variant="outlined" onClick={petCat}>
                                    Pet {name}
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => dispatch(clean())}
                                >
                                    Clean toilet{' '}
                                </Button>
                            </>
                        )}
                    </CardActions>
                </Card>
            </Grid>
            <Grid item lg={12}>
                {warning !== '' && (
                    <Typography variant="h6">{warning}</Typography>
                )}
            </Grid>
            <audio ref={audioRef}>
                <source
                    src={`https://komornyi.space/static/img/cat_project/audio/${audio}.mp3`}
                    type="audio/mpeg"
                />
            </audio>
        </Grid>
    );
};

export default Cat;
