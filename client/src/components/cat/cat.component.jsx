import React, { useEffect, useState } from 'react';

import {
    feedCat,
    petCat,
    setDigestionLevel,
} from '../../redux/reducers/owner.reducer';

import { Card, Grid, CardContent, Typography } from '@mui/material';

import Level from './level.component';
import Action from '../action/action.component';

import TombStone from '../../icons/tombstone.png';

import { useStyles } from './cat.styles';
import { useDispatch } from 'react-redux';
import { setSound } from '../../redux/reducers/sound.reducer';

const Cat = ({ cat }) => {
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(false);

    const classes = useStyles(isVisible);

    useEffect(() => {
        if (cat.digestionLevel <= 1) dispatch(setSound('poo'));
    }, [cat.digestionLevel, dispatch]);

    useEffect(() => {
        if (cat.moodLevel <= 0) dispatch(setSound('sad'));
    }, [cat.moodLevel, dispatch]);

    const isDisabled = () => cat.foodLevel === 0 || cat.healthLevel < 100;

    const actions = [
        {
            title: 'Feed cat',
            dispatches: [
                feedCat({
                    id: cat.id,
                    newFoodLevel:
                        cat.foodLevel + 5 > 100 ? 100 : cat.foodLevel + 5,
                }),
                setDigestionLevel({
                    id: cat.id,
                    newDigestionLevel:
                        cat.digestionLevel <= 0 ? 30 : cat.digestionLevel,
                }),
            ],
            imgSrc: 'feed.png',
            isDisabled: false,
            sound: 'eating',
        },
        {
            title: 'Pet cat',
            dispatches: [
                petCat({
                    id: cat.id,
                    newMoodLevel: 100,
                }),
            ],
            imgSrc: 'pet.png',
            isDisabled: isDisabled(),
            sound: 'purring',
        },
    ];

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
                            <Grid container item xl={12} lg={12} spacing={2}>
                                <Grid item xl={12} lg={12}>
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
                                <Level value={cat.healthLevel} level="health" />
                                <Level value={cat.foodLevel} level="food" />
                                <Level value={cat.moodLevel} level="mood" />
                            </Grid>
                        </CardContent>
                        <Grid container className={classes.actions}>
                            {actions.map((action, index) => (
                                <Grid item xl={4} lg={4} key={index}>
                                    <Action
                                        dispatches={action.dispatches}
                                        title={action.title}
                                        isDisabled={action.isDisabled}
                                        sound={action.sound}
                                    >
                                        <img
                                            src={`${process.env.REACT_APP_HOST_IMG_URL}/owner/actions/${action.imgSrc}`}
                                            width="100%"
                                            alt={action.title}
                                            className={`${
                                                action.isDisabled
                                                    ? classes.disabledAction
                                                    : ''
                                            }`}
                                        />
                                    </Action>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Card>
        </>
    );
};

export default Cat;
