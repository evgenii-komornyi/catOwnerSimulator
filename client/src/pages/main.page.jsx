import React from 'react';
import { useSelector } from 'react-redux';

import { Container, Typography, useMediaQuery } from '@mui/material';
import Owner from '../components/owner/owner.component';
import Menu from '../components/menu/menu.component';
import { useStyles } from './main-page.styles';

const MainPage = ({ startGame }) => {
    const landscape = useMediaQuery('(orientation: landscape)');

    const classes = useStyles();

    const { intervalId } = useSelector((state) => state.interval);

    return landscape ? (
        <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h3">
                This app is not support on landscape oriented devices
            </Typography>
        </Container>
    ) : (
        <Container maxWidth="lg" className={classes.container}>
            {intervalId !== 0 ? <Owner /> : <Menu startGame={startGame} />}
        </Container>
    );
};

export default MainPage;
