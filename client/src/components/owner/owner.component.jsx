import React from 'react';
import { Card, CardActionArea, CardContent, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { setIsOpen } from '../../redux/reducers/modal.reducer';

import Cat from '../cat/cat.component';
import { Add } from '@mui/icons-material';

const Owner = () => {
    const { cats } = useSelector((state) => state.owner);
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
                        <Grid item xl={3} key={key}>
                            <Cat cat={cat} />
                        </Grid>
                    ))}
                {cats.length < 4 && (
                    <Grid item xl={3}>
                        <CardActionArea onClick={() => dispatch(setIsOpen())}>
                            <Card variant="elevation" sx={{ height: 315 }}>
                                <CardContent>
                                    <Add
                                        sx={{ fontSize: 250, color: '#333' }}
                                    />
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                )}
            </Grid>
            <Grid container>
                <Grid item xl={4} sx={{ textAlign: 'right' }}>
                    <img
                        src={`${process.env.REACT_APP_HOST_IMG_URL}/owner/apartment/house_slot.png`}
                        alt=""
                    />
                </Grid>
                <Grid container item xl={4} sx={{ textAlign: 'center' }}>
                    <Grid item xl={12}>
                        <img
                            src={`${process.env.REACT_APP_HOST_IMG_URL}/owner/apartment/apartment.png`}
                            alt=""
                        />
                    </Grid>
                    <Grid item xl={6} sx={{ mt: -0.9 }}>
                        <img
                            src={`${process.env.REACT_APP_HOST_IMG_URL}/owner/apartment/toilet_slot.png`}
                            alt=""
                        />
                    </Grid>
                    <Grid item xl={6} sx={{ mt: -0.9 }}>
                        <img
                            src={`${process.env.REACT_APP_HOST_IMG_URL}/owner/apartment/toys_slot.png`}
                            alt=""
                        />
                    </Grid>
                </Grid>
                <Grid item xl={4}></Grid>
            </Grid>
        </>
    );
};

export default Owner;
