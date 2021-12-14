import React from 'react';

import { Badge, Card, CardActionArea, CardContent, Grid } from '@mui/material';
import { Add } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';

import { setIsOpen } from '../../redux/reducers/modal.reducer';
import {
    cleanToilets,
    cleanRoom,
    airRoom,
} from '../../redux/reducers/owner.reducer';

import Cat from '../cat/cat.component';
import Action from '../action/action.component';

import { MAX_FLAT_SMELL } from '../../helpers/max_values';
import Sound from '../sound/sound.component';
import { useStyles } from './owner.styles';

const Owner = () => {
    const classes = useStyles();

    const { cats, flat, toilets } = useSelector((state) => state.owner);
    const dispatch = useDispatch();

    return (
        <>
            <Grid
                container
                textAlign="center"
                spacing={2}
                sx={{ mb: 2, mt: 2 }}
            >
                {cats.length !== 0 &&
                    cats.map((cat, key) => (
                        <Grid item xl={3} lg={3} md={3} sm={4} xs={6} key={key}>
                            <Cat cat={cat} />
                        </Grid>
                    ))}
                {cats.length < 4 && (
                    <Grid item xl={3} lg={3} md={3} sm={4} xs={6}>
                        <CardActionArea onClick={() => dispatch(setIsOpen())}>
                            <Card
                                variant="elevation"
                                className={classes.cardAdd}
                            >
                                <CardContent>
                                    <Add className={classes.addBtn} />
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                )}
            </Grid>
            <Grid container>
                <Grid item xl={2} lg={2} sx={{ textAlign: 'right' }}>
                    <img
                        src={`${process.env.REACT_APP_HOST_IMG_URL}/owner/apartment/house_slot.png`}
                        alt=""
                    />
                </Grid>
                <Grid container item xl={4} lg={4} sx={{ textAlign: 'center' }}>
                    <Grid item xl={12} lg={12}>
                        <img
                            src={`${process.env.REACT_APP_HOST_IMG_URL}/owner/apartment/${flat.flat_img}.png`}
                            alt=""
                            style={{ width: '100%' }}
                        />
                        <div
                            style={{
                                position: 'relative',
                                width: '99%',
                                height: '96%',
                                top: '-198px',
                                left: '3px',
                                backgroundColor: `rgba(0, 255, 0, ${
                                    flat.smell / MAX_FLAT_SMELL
                                })`,
                            }}
                        />
                    </Grid>
                    <Grid item xl={6} lg={6} sx={{ mt: -0.9 }}>
                        {toilets.length === 0 ? (
                            <img
                                src={`${process.env.REACT_APP_HOST_IMG_URL}/owner/apartment/toilet_slot.png`}
                                alt=""
                            />
                        ) : (
                            <img
                                src={`${process.env.REACT_APP_HOST_IMG_URL}/owner/items/toilets/${toilets[0].toilet_img}.png`}
                                alt=""
                            />
                        )}
                    </Grid>
                    <Grid item xl={6} lg={6} sx={{ mt: -0.9 }}>
                        <img
                            src={`${process.env.REACT_APP_HOST_IMG_URL}/owner/apartment/toys_slot.png`}
                            alt=""
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    xl={4}
                    lg={4}
                    container
                    spacing={1}
                    sx={{ alignContent: 'start' }}
                >
                    <Grid item xl={4} lg={4}>
                        <Action
                            dispatches={[cleanToilets()]}
                            title="Clean toilets"
                            sound="toilet_cleanup"
                        >
                            <img
                                src={`${process.env.REACT_APP_HOST_IMG_URL}/owner/actions/clean_toilet.png`}
                                width="100%"
                                alt="clean_toilets"
                            />
                        </Action>
                    </Grid>
                    <Grid item xl={4} lg={4}>
                        <Action
                            dispatches={[cleanRoom()]}
                            title="Clean room"
                            sound="flat_cleanup"
                        >
                            <Badge badgeContent={flat.impurity} color="primary">
                                <img
                                    src={`${process.env.REACT_APP_HOST_IMG_URL}/owner/actions/clean_room.png`}
                                    width="100%"
                                    alt="clean_flat"
                                />
                            </Badge>
                        </Action>
                    </Grid>
                    <Grid item xl={4} lg={4}>
                        <Action
                            dispatches={[airRoom()]}
                            title="Air room"
                            sound={
                                flat.isWindowOpen
                                    ? 'close_window'
                                    : 'open_window'
                            }
                        >
                            <Badge
                                badgeContent={flat.smell}
                                color="primary"
                                max={100}
                            >
                                <img
                                    src={`${
                                        process.env.REACT_APP_HOST_IMG_URL
                                    }/owner/actions/window_${
                                        flat.isWindowOpen ? 'close' : 'open'
                                    }.png`}
                                    width="100%"
                                    alt="blow"
                                />
                            </Badge>
                        </Action>
                    </Grid>
                </Grid>
            </Grid>
            <Sound />
        </>
    );
};

export default Owner;
