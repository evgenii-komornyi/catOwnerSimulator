import React, { useEffect, useState } from 'react';
import {
    Card,
    Grid,
    CardContent,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import {
    feedCat,
    petCat,
    setDigestionLevel,
} from '../../redux/reducers/owner.reducer';

import { setSound } from '../../redux/reducers/sound.reducer';

import {
    MAX_HEALTH_LEVEL,
    MAX_FOOD_LEVEL,
    MAX_MOOD_LEVEL,
    MAX_DIGESTION_LEVEL,
} from '../../helpers/max_values';

import Level from './level.component';
import Action from '../action/action.component';
import ActionMenu from '../action/action-menu.component';
import MobileAction from '../action/mobile-action.component';

import TombStone from '../../icons/tombstone.png';

import { useStyles } from './cat.styles';
import { useTheme } from '@emotion/react';

const Cat = ({ cat }) => {
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(false);

    const classes = useStyles(isVisible);

    const theme = useTheme();
    const matched = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        if (cat.digestionLevel === 1) dispatch(setSound('poo'));
    }, [cat.digestionLevel, dispatch]);

    useEffect(() => {
        if (cat.moodLevel <= 0) dispatch(setSound('sad'));
    }, [cat.moodLevel, dispatch]);

    const isDisabled = () => cat.foodLevel === 0;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const actions = [
        {
            title: 'Feed cat',
            dispatches: [
                feedCat({
                    id: cat.id,
                    newFoodLevel: MAX_FOOD_LEVEL,
                }),
                setDigestionLevel({
                    id: cat.id,
                    newDigestionLevel:
                        cat.digestionLevel <= 0
                            ? MAX_DIGESTION_LEVEL
                            : cat.digestionLevel,
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
                    newMoodLevel: MAX_MOOD_LEVEL,
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
                className={classes.catCard}
                onMouseOver={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {cat.healthLevel <= 0 ? (
                    <img src={TombStone} width="100%" alt={cat.name} />
                ) : (
                    <>
                        <Typography variant="h6" className={classes.catName}>
                            {cat.name}
                        </Typography>
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
                                <Level
                                    currentValue={cat.healthLevel}
                                    maxValue={MAX_HEALTH_LEVEL}
                                    level="health"
                                />
                                <Level
                                    currentValue={cat.foodLevel}
                                    maxValue={MAX_FOOD_LEVEL}
                                    level="food"
                                />
                                <Level
                                    currentValue={cat.moodLevel}
                                    maxValue={MAX_MOOD_LEVEL}
                                    level="mood"
                                />
                            </Grid>
                        </CardContent>
                        {matched ? (
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
                        ) : (
                            <Grid container>
                                <Grid
                                    item
                                    xl={12}
                                    lg={12}
                                    style={{ margin: '0 auto' }}
                                >
                                    <ActionMenu
                                        anchorEl={anchorEl}
                                        open={open}
                                        handleClose={handleClose}
                                        handleClick={handleClick}
                                        title="Cat"
                                        margin={{ mt: -7 }}
                                    >
                                        {actions.map((action, index) => (
                                            <div key={index}>
                                                <MobileAction
                                                    dispatches={
                                                        action.dispatches
                                                    }
                                                    isDisabled={
                                                        action.isDisabled
                                                    }
                                                    sound={action.sound}
                                                    handleClose={handleClose}
                                                >
                                                    {action.title}
                                                </MobileAction>
                                            </div>
                                        ))}
                                    </ActionMenu>
                                </Grid>
                            </Grid>
                        )}
                    </>
                )}
            </Card>
        </>
    );
};

export default Cat;
